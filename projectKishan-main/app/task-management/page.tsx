"use client"
import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    QrCode,
    Users,
    ClipboardList,
    Plus,
    Eye,
    CheckCircle,
    Clock,
    AlertCircle,
    Loader2,
    RefreshCw,
    Copy,
    Check
} from "lucide-react"

// Types
interface UserProfile {
    id: string
    email: string
    name: string
    role: "Farmer" | "worker"
    farmerId?: string
    farmerName?: string
    joinCode?: string
    assignedAt?: string
}

interface Task {
    id: string
    title: string
    description: string
    assignedTo: string
    assignedBy: string
    status: "assigned" | "in-progress" | "completed"
    createdAt: string
    completedAt?: string
}

// QR Code component using canvas
function QRCodeSVG({ value, size }: { value: string; size: number }) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div
                className="bg-white border-2 border-gray-300 flex items-center justify-center p-4 rounded-lg"
                style={{ width: size, height: size }}
            >
                <div className="grid grid-cols-8 gap-1">
                    {Array.from({ length: 64 }, (_, i) => (
                        <div
                            key={i}
                            className={`w-2 h-2 ${(value.charCodeAt(i % value.length) + i) % 3 === 0
                                ? 'bg-black'
                                : 'bg-white'
                                }`}
                        />
                    ))}
                </div>
            </div>
            <p className="text-xs text-gray-600 font-mono">{value}</p>
        </div>
    )
}

// Mock data with Indian names
const MOCK_WORKERS: UserProfile[] = [
    {
        id: "worker-1",
        email: "priya.sharma@example.com",
        name: "Priya Sharma",
        role: "worker",
        farmerId: "farmer-123",
        farmerName: "Rajesh Kumar",
        assignedAt: "2024-01-15T08:00:00Z"
    },
    {
        id: "worker-2",
        email: "amit.patel@example.com",
        name: "Amit Patel",
        role: "worker",
        farmerId: "farmer-123",
        farmerName: "Rajesh Kumar",
        assignedAt: "2024-01-20T09:30:00Z"
    },
    {
        id: "worker-3",
        email: "sunita.singh@example.com",
        name: "Sunita Singh",
        role: "worker",
        farmerId: "farmer-123",
        farmerName: "Rajesh Kumar",
        assignedAt: "2024-02-01T10:15:00Z"
    },
    {
        id: "worker-4",
        email: "vikram.gupta@example.com",
        name: "Vikram Gupta",
        role: "worker",
        farmerId: "farmer-123",
        farmerName: "Rajesh Kumar",
        assignedAt: "2024-02-10T07:45:00Z"
    },
    {
        id: "worker-5",
        email: "meera.reddy@example.com",
        name: "Meera Reddy",
        role: "worker",
        farmerId: "farmer-123",
        farmerName: "Rajesh Kumar",
        assignedAt: "2024-02-15T11:20:00Z"
    }
]

const MOCK_TASKS: Task[] = [
    {
        id: "task-1",
        title: "Water the tomato crops",
        description: "Water all tomato plants in greenhouse section A. Check soil moisture first.",
        assignedTo: "worker-1",
        assignedBy: "farmer-123",
        status: "completed",
        createdAt: "2024-02-20T06:00:00Z",
        completedAt: "2024-02-20T08:30:00Z"
    },
    {
        id: "task-2",
        title: "Harvest wheat from field 2",
        description: "Harvest mature wheat from the eastern field. Store in warehouse B.",
        assignedTo: "worker-2",
        assignedBy: "farmer-123",
        status: "in-progress",
        createdAt: "2024-02-21T05:30:00Z"
    },
    {
        id: "task-3",
        title: "Apply fertilizer to corn field",
        description: "Apply organic fertilizer to the corn plantation. Follow safety guidelines.",
        assignedTo: "worker-3",
        assignedBy: "farmer-123",
        status: "assigned",
        createdAt: "2024-02-22T07:00:00Z"
    },
    {
        id: "task-4",
        title: "Check irrigation system",
        description: "Inspect all irrigation pipes and sprinklers for any leaks or damage.",
        assignedTo: "worker-4",
        assignedBy: "farmer-123",
        status: "assigned",
        createdAt: "2024-02-22T08:15:00Z"
    }
]

export default function FarmTaskManagement() {
    // Mock current user - you can change this to test different roles
    const [currentUser, setCurrentUser] = useState<UserProfile>({
        id: "farmer-123",
        email: "rajesh.kumar@example.com",
        name: "Rajesh Kumar",
        role: "Farmer",
        joinCode: "FARM2024"
    })

    // State
    const [workers, setWorkers] = useState<UserProfile[]>(MOCK_WORKERS)
    const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS)
    const [loading, setLoading] = useState(false)
    const [showQRCode, setShowQRCode] = useState(false)
    const [joinCode, setJoinCode] = useState("")
    const [message, setMessage] = useState<string | null>(null)
    const [messageType, setMessageType] = useState<"success" | "error">("success")
    const [copySuccess, setCopySuccess] = useState(false)

    // Task form state
    const [newTaskTitle, setNewTaskTitle] = useState("")
    const [newTaskDescription, setNewTaskDescription] = useState("")
    const [selectedWorker, setSelectedWorker] = useState("")

    // Derived data
    const myTasks = useMemo(() =>
        tasks.filter(t => t.assignedTo === currentUser?.id),
        [tasks, currentUser]
    )

    const tasksForMyWorkers = useMemo(() => {
        const workerIds = workers.map(w => w.id)
        return tasks.filter(t => workerIds.includes(t.assignedTo))
    }, [tasks, workers])

    // Utility function to show messages
    const showMessage = (msg: string, type: "success" | "error" = "success") => {
        setMessage(msg)
        setMessageType(type)
        setTimeout(() => setMessage(null), 5000)
    }

    // Mock API Functions (using dummy data)
    const fetchTasks = async () => {
        setLoading(true)
        // Simulate API delay
        setTimeout(() => {
            setTasks(MOCK_TASKS)
            setLoading(false)
            showMessage("Tasks refreshed successfully!")
        }, 1000)
    }

    const fetchWorkers = async () => {
        if (currentUser.role !== "Farmer") return

        setLoading(true)
        setTimeout(() => {
            setWorkers(MOCK_WORKERS)
            setLoading(false)
            showMessage("Workers refreshed successfully!")
        }, 800)
    }

    const createTask = async () => {
        if (!newTaskTitle || !selectedWorker) return

        setLoading(true)

        const newTask: Task = {
            id: `task-${Date.now()}`,
            title: newTaskTitle,
            description: newTaskDescription,
            assignedTo: selectedWorker,
            assignedBy: currentUser.id,
            status: "assigned",
            createdAt: new Date().toISOString()
        }

        setTimeout(() => {
            setTasks(prev => [...prev, newTask])
            setNewTaskTitle("")
            setNewTaskDescription("")
            setSelectedWorker("")
            setLoading(false)
            showMessage("Task created successfully!", "success")
        }, 1000)
    }

    const updateTaskStatus = async (taskId: string, newStatus: Task["status"]) => {
        setLoading(true)

        setTimeout(() => {
            setTasks(prev => prev.map(task => {
                if (task.id === taskId) {
                    return {
                        ...task,
                        status: newStatus,
                        completedAt: newStatus === "completed" ? new Date().toISOString() : task.completedAt
                    }
                }
                return task
            }))
            setLoading(false)
            showMessage("Task updated successfully!", "success")
        }, 800)
    }

    const joinFarm = async () => {
        if (!joinCode) return

        setLoading(true)

        setTimeout(() => {
            if (joinCode.toUpperCase() === "FARM2024") {
                setCurrentUser(prev => ({
                    ...prev,
                    farmerId: "farmer-123",
                    farmerName: "Rajesh Kumar"
                }))
                setJoinCode("")
                showMessage("Successfully joined Rajesh Kumar's farm!", "success")
                // Fetch tasks for the worker
                setTimeout(() => {
                    const workerTasks = MOCK_TASKS.filter(t => t.assignedTo === currentUser.id)
                    setTasks(workerTasks)
                }, 500)
            } else {
                showMessage("Invalid join code. Try 'FARM2024'", "error")
            }
            setLoading(false)
        }, 1000)
    }

    const generateJoinCode = async () => {
        setLoading(true)

        setTimeout(() => {
            const newJoinCode = `FARM${Math.random().toString(36).substr(2, 4).toUpperCase()}`
            setCurrentUser(prev => ({
                ...prev,
                joinCode: newJoinCode
            }))
            setLoading(false)
            showMessage("New join code generated!", "success")
        }, 800)
    }

    // Copy join code to clipboard
    const copyJoinCode = async () => {
        if (!currentUser?.joinCode) return

        try {
            await navigator.clipboard.writeText(currentUser.joinCode)
            setCopySuccess(true)
            setTimeout(() => setCopySuccess(false), 2000)
        } catch (error) {
            showMessage("Failed to copy join code", "error")
        }
    }

    // Switch user role for demo purposes
    const switchToWorker = () => {
        setCurrentUser({
            id: "worker-1",
            email: "priya.sharma@example.com",
            name: "Priya Sharma",
            role: "worker",
            farmerId: "farmer-123",
            farmerName: "Rajesh Kumar"
        })
        setMessage(null)
    }

    const switchToFarmer = () => {
        setCurrentUser({
            id: "farmer-123",
            email: "rajesh.kumar@example.com",
            name: "Rajesh Kumar",
            role: "Farmer",
            joinCode: "FARM2024"
        })
        setMessage(null)
    }

    // Load data on mount
    useEffect(() => {
        if (currentUser) {
            if (currentUser.role === "Farmer") {
                setWorkers(MOCK_WORKERS)
                setTasks(MOCK_TASKS)
            } else {
                // For workers, show only their assigned tasks
                const workerTasks = MOCK_TASKS.filter(t => t.assignedTo === currentUser.id)
                setTasks(workerTasks)
            }
        }
    }, [currentUser])

    // Utility functions
    const getStatusIcon = (status: Task["status"]) => {
        switch (status) {
            case "assigned":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />
            case "in-progress":
                return <Clock className="h-4 w-4 text-blue-500" />
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-500" />
        }
    }

    const getStatusBadge = (status: Task["status"]) => {
        const colorMap = {
            assigned: "bg-yellow-100 text-yellow-800",
            "in-progress": "bg-blue-100 text-blue-800",
            completed: "bg-green-100 text-green-800",
        }
        return <Badge className={colorMap[status]}>{status.replace("-", " ")}</Badge>
    }

    // Show loading if user is not loaded yet
    if (!currentUser) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-emerald-600" />
                <span className="ml-2">Loading user data...</span>
            </div>
        )
    }

    // Worker Dashboard
    if (currentUser?.role === "worker") {
        return (
            <div className="min-h-screen bg-gray-50">
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Worker Dashboard</h1>
                            <p className="text-gray-600">Welcome, {currentUser.name}</p>
                            {currentUser.farmerName && (
                                <p className="text-sm text-emerald-600">Working for: {currentUser.farmerName}</p>
                            )}
                        </div>
                        <div className="flex gap-2">
                            <Button
                                variant="outline"
                                onClick={fetchTasks}
                                disabled={loading}
                            >
                                {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                                Refresh
                            </Button>
                            <Button variant="ghost" onClick={switchToFarmer}>
                                Switch to Farmer View
                            </Button>
                        </div>
                    </div>
                </header>

                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
                    {message && (
                        <Alert className={messageType === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                            <AlertDescription className={messageType === "error" ? "text-red-800" : "text-green-800"}>
                                {message}
                            </AlertDescription>
                        </Alert>
                    )}

                    {!currentUser.farmerId ? (
                        <Card>
                            <CardHeader>
                                <CardTitle>Join a Farm</CardTitle>
                                <CardDescription>Enter the join code provided by your farmer to start receiving tasks</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="join-code">Farm Join Code</Label>
                                    <Input
                                        id="join-code"
                                        placeholder="e.g. FARM2024"
                                        value={joinCode}
                                        onChange={e => setJoinCode(e.target.value.toUpperCase())}
                                        disabled={loading}
                                        maxLength={10}
                                    />
                                    <p className="text-xs text-gray-500">Hint: Try "FARM2024" for demo</p>
                                </div>
                                <Button onClick={joinFarm} disabled={loading || !joinCode.trim()}>
                                    {loading ? (
                                        <>
                                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                            Joining...
                                        </>
                                    ) : (
                                        'Join Farm'
                                    )}
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ClipboardList className="h-5 w-5" /> My Tasks
                                </CardTitle>
                                <CardDescription>
                                    Tasks assigned by {currentUser.farmerName}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                {myTasks.length === 0 ? (
                                    <div className="text-center py-8">
                                        <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                        <p className="text-gray-500">No tasks assigned yet</p>
                                        <p className="text-sm text-gray-400 mt-1">Your farmer will assign tasks that will appear here</p>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {myTasks.map(task => (
                                            <div key={task.id} className="border rounded-lg p-4 space-y-3 hover:shadow-md transition-shadow">
                                                <div className="flex items-start justify-between">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold text-lg">{task.title}</h3>
                                                        <p className="text-gray-600 mt-1">{task.description}</p>
                                                        <p className="text-sm text-gray-500 mt-2">
                                                            Assigned: {new Date(task.createdAt).toLocaleDateString()}
                                                        </p>
                                                        {task.completedAt && (
                                                            <p className="text-sm text-green-600 mt-1">
                                                                Completed: {new Date(task.completedAt).toLocaleDateString()}
                                                            </p>
                                                        )}
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        {getStatusIcon(task.status)}
                                                        {getStatusBadge(task.status)}
                                                    </div>
                                                </div>

                                                {/* Task actions for worker */}
                                                <div className="flex gap-2">
                                                    {task.status === "assigned" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => updateTaskStatus(task.id, "in-progress")}
                                                            disabled={loading}
                                                            className="bg-blue-600 hover:bg-blue-700"
                                                        >
                                                            Start Task
                                                        </Button>
                                                    )}
                                                    {task.status === "in-progress" && (
                                                        <Button
                                                            size="sm"
                                                            onClick={() => updateTaskStatus(task.id, "completed")}
                                                            disabled={loading}
                                                            className="bg-green-600 hover:bg-green-700"
                                                        >
                                                            Mark Complete
                                                        </Button>
                                                    )}
                                                    {task.status === "completed" && (
                                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                            Task Completed ✓
                                                        </Badge>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )}
                </main>
            </div>
        )
    }

    // Farmer Dashboard
    return (
        <div className="min-h-screen bg-gray-50">
            <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Farmer Dashboard</h1>
                        <p className="text-gray-600">Welcome, {currentUser.name}</p>
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            onClick={() => {
                                fetchTasks()
                                fetchWorkers()
                            }}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <RefreshCw className="h-4 w-4 mr-2" />}
                            Refresh
                        </Button>
                        <Button variant="ghost" onClick={switchToWorker}>
                            Switch to Worker View
                        </Button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
                {message && (
                    <Alert className={messageType === "error" ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"}>
                        <AlertDescription className={messageType === "error" ? "text-red-800" : "text-green-800"}>
                            {message}
                        </AlertDescription>
                    </Alert>
                )}

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <StatCard
                        icon={<Users className="h-8 w-8 text-blue-600" />}
                        label="Total Workers"
                        value={workers.length}
                    />
                    <StatCard
                        icon={<ClipboardList className="h-8 w-8 text-green-600" />}
                        label="Total Tasks"
                        value={tasksForMyWorkers.length}
                    />
                    <StatCard
                        icon={<CheckCircle className="h-8 w-8 text-purple-600" />}
                        label="Completed Tasks"
                        value={tasksForMyWorkers.filter(t => t.status === "completed").length}
                    />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Worker management */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5" /> Worker Management
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold">Join Code: {currentUser.joinCode ?? "—"}</h3>
                                    {currentUser.joinCode && (
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={copyJoinCode}
                                            className="h-8 w-8 p-0"
                                        >
                                            {copySuccess ? (
                                                <Check className="h-4 w-4 text-green-500" />
                                            ) : (
                                                <Copy className="h-4 w-4" />
                                            )}
                                        </Button>
                                    )}
                                </div>
                                <div className="flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={generateJoinCode}
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                                        ) : (
                                            "Generate New"
                                        )}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setShowQRCode(!showQRCode)}
                                    >
                                        <QrCode className="h-4 w-4 mr-2" />
                                        {showQRCode ? "Hide" : "Show"} QR
                                    </Button>
                                </div>
                            </div>

                            {showQRCode && currentUser.joinCode && (
                                <div className="flex justify-center p-4 bg-gray-50 border rounded-lg">
                                    <QRCodeSVG value={currentUser.joinCode} size={150} />
                                </div>
                            )}

                            <Separator />

                            <div>
                                <h4 className="font-medium mb-3">Current Workers ({workers.length})</h4>
                                {workers.length === 0 ? (
                                    <div className="text-center py-4">
                                        <Users className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                                        <p className="text-gray-500">No workers yet</p>
                                        <p className="text-sm text-gray-400 mt-1">Share your join code to invite workers</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {workers.map(w => (
                                            <div key={w.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                                <div>
                                                    <p className="font-medium">{w.name}</p>
                                                    <p className="text-sm text-gray-600">{w.email}</p>
                                                    {w.assignedAt && (
                                                        <p className="text-xs text-gray-500">
                                                            Joined: {new Date(w.assignedAt).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                    Active
                                                </Badge>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Task creation */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Plus className="h-5 w-5" /> Create New Task
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <InputField
                                label="Task Title"
                                value={newTaskTitle}
                                setValue={setNewTaskTitle}
                                placeholder="Enter task title"
                                disabled={loading}
                            />
                            <InputField
                                label="Description"
                                value={newTaskDescription}
                                setValue={setNewTaskDescription}
                                placeholder="Enter task description"
                                disabled={loading}
                            />

                            <div className="space-y-2">
                                <Label>Assign to Worker</Label>
                                <Select
                                    value={selectedWorker}
                                    onValueChange={setSelectedWorker}
                                    disabled={loading || workers.length === 0}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder={
                                            workers.length === 0
                                                ? "No workers available"
                                                : "Select a worker"
                                        } />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {workers.map(w => (
                                            <SelectItem key={w.id} value={w.id}>
                                                {w.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {workers.length === 0 && (
                                    <p className="text-sm text-gray-500">
                                        Add workers first by sharing your join code
                                    </p>
                                )}
                            </div>

                            <Button
                                className="w-full"
                                disabled={!newTaskTitle || !selectedWorker || loading}
                                onClick={createTask}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                        Creating...
                                    </>
                                ) : (
                                    'Create Task'
                                )}
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Task monitoring */}
                <Card className="mt-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Eye className="h-5 w-5" /> Task Monitoring
                        </CardTitle>
                        <CardDescription>
                            Monitor all tasks assigned to your workers
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {tasksForMyWorkers.length === 0 ? (
                            <div className="text-center py-8">
                                <ClipboardList className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <p className="text-gray-500">No tasks created yet</p>
                                <p className="text-sm text-gray-400 mt-1">Start by creating tasks for your workers</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {tasksForMyWorkers.map(t => {
                                    const worker = workers.find(u => u.id === t.assignedTo)
                                    return (
                                        <div key={t.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-lg">{t.title}</h3>
                                                    <p className="text-gray-600 mt-1">{t.description}</p>
                                                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                        <span>Assigned to: <span className="font-medium">{worker?.name ?? "Unknown Worker"}</span></span>
                                                        <span>Created: {new Date(t.createdAt).toLocaleDateString()}</span>
                                                        {t.completedAt && (
                                                            <span className="text-green-600">
                                                                Completed: {new Date(t.completedAt).toLocaleDateString()}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    {getStatusIcon(t.status)}
                                                    {getStatusBadge(t.status)}
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}

// Reusable components
function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardContent className="p-6 flex items-center gap-4">
                {icon}
                <div>
                    <p className="text-sm font-medium text-gray-600">{label}</p>
                    <p className="text-2xl font-bold text-gray-900">{value}</p>
                </div>
            </CardContent>
        </Card>
    )
}

function InputField({
    label,
    value,
    setValue,
    placeholder,
    disabled = false
}: {
    label: string
    value: string
    setValue: (v: string) => void
    placeholder: string
    disabled?: boolean
}) {
    return (
        <div className="space-y-2">
            <Label>{label}</Label>
            <Input
                value={value}
                placeholder={placeholder}
                onChange={e => setValue(e.target.value)}
                disabled={disabled}
            />
        </div>
    )
}