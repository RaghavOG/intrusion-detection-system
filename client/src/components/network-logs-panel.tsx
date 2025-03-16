"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Play, Pause, AlertTriangle, CheckCircle } from "lucide-react"

// Sample network log data
const sampleLogs = [
  {
    id: 1,
    timestamp: "2025-03-16T20:15:45",
    source: "192.168.1.105",
    destination: "172.217.167.78",
    protocol: "HTTPS",
    status: "secure",
    details: "GET request to google.com",
  },
  {
    id: 2,
    timestamp: "2025-03-16T20:15:48",
    source: "192.168.1.105",
    destination: "104.244.42.193",
    protocol: "HTTPS",
    status: "secure",
    details: "POST request to api.twitter.com",
  },
  {
    id: 3,
    timestamp: "2025-03-16T20:15:52",
    source: "192.168.1.105",
    destination: "185.199.108.153",
    protocol: "HTTPS",
    status: "secure",
    details: "GET request to github.com",
  },
  {
    id: 4,
    timestamp: "2025-03-16T20:16:01",
    source: "192.168.1.105",
    destination: "93.184.216.34",
    protocol: "HTTP",
    status: "suspicious",
    details: "Unencrypted connection attempt",
  },
  {
    id: 5,
    timestamp: "2025-03-16T20:16:05",
    source: "192.168.1.105",
    destination: "54.229.21.92",
    protocol: "HTTPS",
    status: "secure",
    details: "GET request to amazonaws.com",
  },
]

export default function NetworkLogsPanel() {
  const [isMonitoring, setIsMonitoring] = useState(false)
  const [logs, setLogs] = useState([])

  // Simulate receiving network logs
  useEffect(() => {
    if (isMonitoring) {
      setLogs(sampleLogs)

      // Simulate new logs coming in
      const interval = setInterval(() => {
        const newLog = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          source: "192.168.1.105",
          destination: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          protocol: Math.random() > 0.2 ? "HTTPS" : "HTTP",
          status: Math.random() > 0.3 ? "secure" : "suspicious",
          details: Math.random() > 0.3 ? "Standard web traffic" : "Unusual connection pattern detected",
        }

        setLogs((prevLogs) => [newLog, ...prevLogs.slice(0, 9)])
      }, 3000)

      return () => clearInterval(interval)
    } else {
      setLogs([])
    }
  }, [isMonitoring])

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  return (
    <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden w-full">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h3 className="font-semibold">Network Logs</h3>
        <Button
          onClick={() => setIsMonitoring(!isMonitoring)}
          className={isMonitoring ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}
        >
          {isMonitoring ? (
            <>
              <Pause className="mr-2 h-4 w-4" /> Stop Monitoring
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" /> Start Monitoring
            </>
          )}
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-900">
              <th className="px-4 py-2 text-left">Time</th>
              <th className="px-4 py-2 text-left">Source IP</th>
              <th className="px-4 py-2 text-left">Destination IP</th>
              <th className="px-4 py-2 text-left">Protocol</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Details</th>
            </tr>
          </thead>
          <tbody>
            {logs.length > 0 ? (
              logs.map((log) => (
                <tr key={log.id} className="border-t border-gray-700 hover:bg-gray-750">
                  <td className="px-4 py-2 text-gray-300">{formatTimestamp(log.timestamp)}</td>
                  <td className="px-4 py-2 text-gray-300">{log.source}</td>
                  <td className="px-4 py-2 text-gray-300">{log.destination}</td>
                  <td className="px-4 py-2 text-gray-300">{log.protocol}</td>
                  <td className="px-4 py-2">
                    {log.status === "secure" ? (
                      <span className="flex items-center text-green-500">
                        <CheckCircle className="mr-1 h-4 w-4" /> Secure
                      </span>
                    ) : (
                      <span className="flex items-center text-amber-500">
                        <AlertTriangle className="mr-1 h-4 w-4" /> Suspicious
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-2 text-gray-300">{log.details}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  {isMonitoring ? "Loading network logs..." : "Click 'Start Monitoring' to view network logs"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

