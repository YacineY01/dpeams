"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Play,
  Square,
  Save,
  FolderOpen,
  Settings,
  Zap,
  Code,
  FileText,
  Trash2,
  Plus,
  Download,
  Upload,
  Terminal,
  Shield,
  Cpu,
} from "lucide-react"

export default function IgniteExecutor() {
  const [isExecuting, setIsExecuting] = useState(false)
  const [currentScript, setCurrentScript] = useState(`-- Welcome to Ignite Executor
-- Your premium Roblox script execution environment

print("Hello, Ignite!")

-- Example script
local Players = game:GetService("Players")
local player = Players.LocalPlayer

print("Player: " .. player.Name)`)

  const [savedScripts] = useState([
    { name: "Auto Farm", size: "2.1 KB", modified: "2 hours ago" },
    { name: "Speed Hack", size: "1.8 KB", modified: "1 day ago" },
    { name: "Teleport GUI", size: "4.2 KB", modified: "3 days ago" },
    { name: "ESP Script", size: "3.5 KB", modified: "1 week ago" },
  ])

  const handleExecute = () => {
    setIsExecuting(true)
    setTimeout(() => setIsExecuting(false), 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
      <div className="max-w-7xl mx-auto space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">Ignite</h1>
              <Badge variant="secondary" className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                Premium
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-green-400 border-green-400/30 bg-green-400/10">
              <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
              Connected
            </Badge>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[calc(100vh-120px)]">
          {/* Left Sidebar - Script Management */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-white flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Scripts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-3 h-3 mr-1" />
                  New
                </Button>
                <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                  <FolderOpen className="w-3 h-3" />
                </Button>
              </div>
              <Separator className="bg-slate-700" />
              <ScrollArea className="h-64">
                <div className="space-y-2">
                  {savedScripts.map((script, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-white">{script.name}</span>
                        <Button size="icon" variant="ghost" className="w-6 h-6 text-slate-400 hover:text-red-400">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-xs text-slate-400 mt-1">
                        {script.size} • {script.modified}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Main Editor Area */}
          <div className="lg:col-span-2 space-y-4">
            {/* Editor */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm flex-1">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Code className="w-4 h-4" />
                    Script Editor
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Save className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                      <Upload className="w-3 h-3 mr-1" />
                      Load
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  <textarea
                    value={currentScript}
                    onChange={(e) => setCurrentScript(e.target.value)}
                    className="w-full h-80 bg-slate-900/50 border border-slate-700 rounded-lg p-4 text-sm font-mono text-slate-200 resize-none focus:outline-none focus:ring-2 focus:ring-orange-500/50"
                    placeholder="Enter your Lua script here..."
                  />
                  <div className="absolute bottom-2 right-2 text-xs text-slate-500">
                    Lines: {currentScript.split("\n").length}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Execution Controls */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Button
                    onClick={handleExecute}
                    disabled={isExecuting}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-6"
                  >
                    {isExecuting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Play className="w-4 h-4 mr-2" />
                        Execute
                      </>
                    )}
                  </Button>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    <Square className="w-4 h-4 mr-2" />
                    Stop
                  </Button>
                  <Separator orientation="vertical" className="h-6 bg-slate-700" />
                  <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                    <Download className="w-3 h-3 mr-1" />
                    Export
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - Status & Tools */}
          <div className="space-y-4">
            {/* System Status */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Injection</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Anti-Detection</span>
                  <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-300">Game Process</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Detected</Badge>
                </div>
                <Separator className="bg-slate-700" />
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-slate-400" />
                  <div className="flex-1">
                    <div className="text-xs text-slate-400">CPU Usage</div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mt-1">
                      <div className="bg-orange-500 h-2 rounded-full w-1/3"></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Console Output */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm flex-1">
              <CardHeader className="pb-3">
                <CardTitle className="text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4" />
                  Console
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-48">
                  <div className="space-y-1 font-mono text-xs">
                    <div className="text-green-400">[INFO] Ignite initialized successfully</div>
                    <div className="text-blue-400">[DEBUG] Injection method: Manual Map</div>
                    <div className="text-green-400">[INFO] Game process detected: RobloxPlayerBeta.exe</div>
                    <div className="text-yellow-400">[WARN] Anti-cheat bypass active</div>
                    <div className="text-slate-400">[LOG] Ready for script execution</div>
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-white text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start border-slate-600 text-slate-300">
                  <Zap className="w-3 h-3 mr-2" />
                  Script Hub
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-slate-600 text-slate-300">
                  <Shield className="w-3 h-3 mr-2" />
                  Bypass Tools
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start border-slate-600 text-slate-300">
                  <Settings className="w-3 h-3 mr-2" />
                  Preferences
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
