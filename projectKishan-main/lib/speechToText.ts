// Google Speech-to-Text API integration
export interface SpeechToTextConfig {
  apiKey: string;
  language: string;
  encoding: 'WEBM_OPUS' | 'LINEAR16' | 'FLAC' | 'MULAW' | 'AMR' | 'AMR_WB' | 'OGG_OPUS' | 'SPEEX_WITH_HEADER_BYTE';
  sampleRateHertz: number;
  enableAutomaticPunctuation?: boolean;
  enableWordTimeOffsets?: boolean;
  model?: 'latest_long' | 'latest_short' | 'command_and_search' | 'phone_call' | 'video' | 'default';
}

export interface SpeechRecognitionResult {
  transcript: string;
  confidence: number;
  languageCode?: string;
}

export class GoogleSpeechToText {
  private apiKey: string;
  private baseUrl = 'https://speech.googleapis.com/v1/speech:recognize';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async recognizeAudio(
    audioBlob: Blob, 
    config: Partial<SpeechToTextConfig> = {}
  ): Promise<SpeechRecognitionResult> {
    try {
      // Convert audio blob to base64
      const audioBase64 = await this.blobToBase64(audioBlob);
      
      const requestBody = {
        config: {
          encoding: config.encoding || 'WEBM_OPUS',
          sampleRateHertz: config.sampleRateHertz || 48000,
          languageCode: config.language || 'en-US',
          enableAutomaticPunctuation: config.enableAutomaticPunctuation ?? true,
          enableWordTimeOffsets: config.enableWordTimeOffsets ?? false,
          model: config.model || 'latest_short',
          // Support for multiple languages
          alternativeLanguageCodes: this.getAlternativeLanguages(config.language || 'en-US'),
        },
        audio: {
          content: audioBase64.split(',')[1], // Remove data:audio/webm;base64, prefix
        },
      };

      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Google Speech API error: ${errorData.error?.message || response.statusText}`);
      }

      const data = await response.json();
      
      if (!data.results || data.results.length === 0) {
        throw new Error('No speech detected in audio');
      }

      const result = data.results[0];
      const alternative = result.alternatives[0];

      return {
        transcript: alternative.transcript,
        confidence: alternative.confidence || 0,
        languageCode: result.languageCode,
      };

    } catch (error) {
      console.error('Google Speech-to-Text error:', error);
      throw error;
    }
  }

  async streamingRecognize(
    onResult: (result: SpeechRecognitionResult) => void,
    onError: (error: Error) => void,
    config: Partial<SpeechToTextConfig> = {}
  ): Promise<MediaRecorder | null> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          sampleRate: config.sampleRateHertz || 16000,
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        }
      });

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus',
        audioBitsPerSecond: 16000,
      });

      const audioChunks: Blob[] = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/webm;codecs=opus' });
        
        try {
          const result = await this.recognizeAudio(audioBlob, {
            ...config,
            encoding: 'WEBM_OPUS',
          });
          onResult(result);
        } catch (error) {
          onError(error as Error);
        }
      };

      return mediaRecorder;

    } catch (error) {
      onError(error as Error);
      return null;
    }
  }

  private async blobToBase64(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  private getAlternativeLanguages(primaryLanguage: string): string[] {
    const languageGroups: Record<string, string[]> = {
      'en-US': ['en-GB', 'en-AU', 'en-CA'],
      'hi-IN': ['en-IN', 'mr-IN', 'gu-IN'],
      'kn-IN': ['hi-IN', 'en-IN', 'te-IN'],
      'ta-IN': ['hi-IN', 'en-IN', 'te-IN'],
      'te-IN': ['hi-IN', 'en-IN', 'ta-IN'],
      'mr-IN': ['hi-IN', 'en-IN', 'gu-IN'],
      'gu-IN': ['hi-IN', 'en-IN', 'mr-IN'],
      'pa-IN': ['hi-IN', 'en-IN', 'gu-IN'],
    };

    return languageGroups[primaryLanguage] || ['en-US'];
  }
}

export default GoogleSpeechToText;
