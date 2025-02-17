"use client"
import { AppSidebarStudent } from '@/app/components/app-sidebar-student'
import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CalendarDays } from 'lucide-react'
import { useState } from 'react'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { SidebarTrigger } from '@/components/ui/sidebar'

const SubjectDetails = () => {

  const [moods] = useState([
    { icon: "😲", percentage: "25.00", label: "Surprised", bgClass: "bg-gray-100/50", color: "text-orange-500" },
    { icon: "😊", percentage: "15.00", label: "Happy", bgClass: "bg-gray-100/50", color: "text-green-500" },
    { icon: "😐", percentage: "20.00", label: "Neutral", bgClass: "bg-gray-100/50", color: "text-blue-500" },
    { icon: "😢", percentage: "10.00", label: "Sad", bgClass: "bg-gray-100/50", color: "text-purple-500" },
    { icon: "🤢", percentage: "8.00", label: "Disgusted", bgClass: "bg-gray-100/50", color: "text-zinc-700" },
    { icon: "😡", percentage: "12.00", label: "Angry", bgClass: "bg-gray-100/50", color: "text-red-500" },
    { icon: "😨", percentage: "10.00", label: "Fearful", bgClass: "bg-gray-100/50", color: "text-slate-500" }
  ]);

  const schedules = [
    { id: 1, date: '2024-02-20', time: '10:00 AM to 11:00 AM', status: 'Finished' },
    { id: 2, date: '2024-02-22', time: '11:00 AM to 12:00 PM', status: 'Upcoming' },
    { id: 3, date: '2024-02-19', time: '11:30 AM to 12:00 PM', status: 'Canceled' },
    { id: 4, date: '2024-02-25', time: '9:00 AM to 10:00 AM', status: 'Upcoming' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Finished':
        return 'bg-green-500'
      case 'Upcoming':
        return 'bg-blue-500'
      case 'Canceled':
        return 'bg-red-500'
      default:
        return 'bg-gray-500'
    }
  }

  return (
    <SidebarProvider>
      <AppSidebarStudent />
      <SidebarInset>
      <header className="flex h-16 shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/student/my-classes/current">
                    List of Subjects
                  </BreadcrumbLink>
                  <BreadcrumbSeparator />
                  <BreadcrumbLink href="#">
                    Current Subject Details
                  </BreadcrumbLink>
                </BreadcrumbItem>                
              </BreadcrumbList>              
            </Breadcrumb>            
          </div>          
        </header>
        <div className="p-2 sm:p-4 md:p-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0 mb-6">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold">Computer Programming 1</h1>
              <p className="text-sm sm:text-md font-extralight">Subject Details</p>
            </div>
          </div>

          <div className="h-auto sm:h-[120px] mb-6">
            <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-4">
              {moods.map((mood, index) => (
                <Card key={index} className="shadow-lg">
                  <CardContent className={`flex flex-col items-center justify-center h-full p-4 ${mood.bgClass}`}>                    
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{mood.icon}</span>
                      <span className="text-lg font-semibold text-gray-800">{mood.label}</span>
                    </div>
                    <p className="text-lg font-semibold text-gray-800">{mood.percentage}%</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 h-auto lg:h-[63vh]">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  <CalendarDays className="h-4 w-4 sm:h-5 sm:w-5" />
                  Class Schedule
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] sm:h-[400px] pr-4">
                  <div className="grid gap-4">
                    {schedules
                      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                      .map((schedule) => (
                        <Card key={schedule.id} className="p-4">
                          <div className="flex justify-between items-center">
                            <div className="space-y-2">
                              <div className="font-medium">{schedule.date}</div>
                              <div className="text-sm text-gray-500">{schedule.time}</div>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className={`${getStatusColor(schedule.status)} text-white whitespace-nowrap`}
                            >
                              {schedule.status}
                            </Badge>
                          </div>
                        </Card>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="w-full">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                  What Content?
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default SubjectDetails