"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Plus, Edit, Trash2, Clock, MapPin, Bell, Download, Sprout, Droplets, Bug } from "lucide-react"
import Link from "next/link"

export default function CalendarMakerPage() {
  const [selectedCrop, setSelectedCrop] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("")
  const [activities, setActivities] = useState<any[]>([])
  const [newActivity, setNewActivity] = useState({
    title: "",
    date: "",
    type: "",
    description: "",
    reminder: false
  })
  const [showAddForm, setShowAddForm] = useState(false)

  const activityTypes = [
    { value: "planting", label: "Planting", icon: Sprout, color: "green" },
    { value: "irrigation", label: "Irrigation", icon: Droplets, color: "blue" },
    { value: "fertilization", label: "Fertilization", icon: Plus, color: "yellow" },
    { value: "pest-control", label: "Pest Control", icon: Bug, color: "red" },
    { value: "harvesting", label: "Harvesting", icon: Calendar, color: "orange" },
    { value: "general", label: "General", icon: Clock, color: "gray" }
  ]

  const generateSchedule = () => {
    // Sample activities based on crop and region
    const sampleActivities = [
      {
        id: 1,
        title: "Land Preparation",
        date: "2024-03-01",
        type: "general",
        description: "Prepare the field for planting season",
        reminder: true
      },
      {
        id: 2,
        title: "Seed Sowing",
        date: "2024-03-15",
        type: "planting",
        description: "Sow seeds with proper spacing",
        reminder: true
      },
      {
        id: 3,
        title: "First Irrigation",
        date: "2024-03-20",
        type: "irrigation",
        description: "Initial watering after sowing",
        reminder: true
      },
      {
        id: 4,
        title: "Fertilizer Application",
        date: "2024-04-01",
        type: "fertilization",
        description: "Apply nitrogen-rich fertilizer",
        reminder: true
      },
      {
        id: 5,
        title: "Pest Monitoring",
        date: "2024-04-15",
        type: "pest-control",
        description: "Check for early signs of pest infestation",
        reminder: false
      }
    ]
    setActivities(sampleActivities)
  }

  const addActivity = () => {
    if (newActivity.title && newActivity.date) {
      const activity = {
        ...newActivity,
        id: Date.now()
      }
      setActivities([...activities, activity])
      setNewActivity({
        title: "",
        date: "",
        type: "",
        description: "",
        reminder: false
      })
      setShowAddForm(false)
    }
  }

  const deleteActivity = (id: number) => {
    setActivities(activities.filter(activity => activity.id !== id))
  }

  const getActivityTypeInfo = (type: string) => {
    return activityTypes.find(t => t.value === type) || activityTypes[activityTypes.length - 1]
  }

  const exportCalendar = () => {
    // Simple export functionality
    const calendarData = activities.map(activity => 
      `${activity.date}: ${activity.title} - ${activity.description}`
    ).join('\n')
    
    const blob = new Blob([calendarData], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `farm-calendar-${selectedCrop || 'general'}.txt`
    a.click()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      {/* Header */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Farm Calendar Maker</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Plan and organize your farming activities with our intelligent calendar system
            </p>
          </div>
        </div>
      </section>

      {/* Calendar Setup */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <Card className="p-8 mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">Create Your Farm Calendar</h2>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Crop Type</label>
                <Select value={selectedCrop} onValueChange={setSelectedCrop}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select crop" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="wheat">Wheat</SelectItem>
                    <SelectItem value="rice">Rice</SelectItem>
                    <SelectItem value="maize">Maize</SelectItem>
                    <SelectItem value="cotton">Cotton</SelectItem>
                    <SelectItem value="tomato">Tomato</SelectItem>
                    <SelectItem value="potato">Potato</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Region</label>
                <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select region" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="north">North India</SelectItem>
                    <SelectItem value="south">South India</SelectItem>
                    <SelectItem value="east">East India</SelectItem>
                    <SelectItem value="west">West India</SelectItem>
                    <SelectItem value="central">Central India</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <Button 
                  onClick={generateSchedule}
                  disabled={!selectedCrop || !selectedRegion}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  Generate Schedule
                </Button>
              </div>
            </div>

            {activities.length > 0 && (
              <div className="flex justify-between items-center">
                <Button 
                  onClick={() => setShowAddForm(true)}
                  variant="outline"
                  className="border-purple-300 text-purple-700 hover:bg-purple-50"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Custom Activity
                </Button>
                
                <Button 
                  onClick={exportCalendar}
                  variant="outline"
                  className="border-green-300 text-green-700 hover:bg-green-50"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Export Calendar
                </Button>
              </div>
            )}
          </Card>

          {/* Add Activity Form */}
          {showAddForm && (
            <Card className="p-6 mb-8 border-purple-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Add New Activity</h3>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Input
                  placeholder="Activity title"
                  value={newActivity.title}
                  onChange={(e) => setNewActivity({...newActivity, title: e.target.value})}
                />
                <Input
                  type="date"
                  value={newActivity.date}
                  onChange={(e) => setNewActivity({...newActivity, date: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <Select 
                  value={newActivity.type} 
                  onValueChange={(value) => setNewActivity({...newActivity, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Activity type" />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map(type => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="reminder"
                    checked={newActivity.reminder}
                    onChange={(e) => setNewActivity({...newActivity, reminder: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <label htmlFor="reminder" className="text-sm text-gray-700">Set reminder</label>
                </div>
              </div>

              <Input
                placeholder="Description (optional)"
                value={newActivity.description}
                onChange={(e) => setNewActivity({...newActivity, description: e.target.value})}
                className="mb-4"
              />

              <div className="flex space-x-3">
                <Button onClick={addActivity} className="bg-purple-600 hover:bg-purple-700 text-white">
                  Add Activity
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)} 
                  variant="outline"
                >
                  Cancel
                </Button>
              </div>
            </Card>
          )}

          {/* Activities List */}
          {activities.length > 0 && (
            <div className="grid gap-4">
              <h3 className="text-xl font-semibold text-gray-900">Scheduled Activities</h3>
              
              {activities
                .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
                .map((activity) => {
                  const typeInfo = getActivityTypeInfo(activity.type)
                  const ActivityIcon = typeInfo.icon
                  
                  return (
                    <Card key={activity.id} className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-${typeInfo.color}-100 rounded-xl flex items-center justify-center`}>
                            <ActivityIcon className={`w-6 h-6 text-${typeInfo.color}-600`} />
                          </div>
                          
                          <div>
                            <h4 className="font-semibold text-gray-900">{activity.title}</h4>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <div className="flex items-center space-x-1">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                  {new Date(activity.date).toLocaleDateString()}
                                </span>
                              </div>
                              {activity.reminder && (
                                <div className="flex items-center space-x-1">
                                  <Bell className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm text-yellow-600">Reminder set</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Badge variant="outline" className={`border-${typeInfo.color}-300 text-${typeInfo.color}-700`}>
                            {typeInfo.label}
                          </Badge>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 border-red-300 hover:bg-red-50"
                            onClick={() => deleteActivity(activity.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  )
                })}
            </div>
          )}

          {activities.length === 0 && selectedCrop && selectedRegion && (
            <Card className="p-8 text-center">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Ready to Generate</h3>
              <p className="text-gray-600">Click "Generate Schedule" to create your personalized farm calendar</p>
            </Card>
          )}
        </div>
      </section>
    </div>
  )
}
