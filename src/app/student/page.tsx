//Dashboard Defautl Page for Student
"use client";

import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarStudent } from "@/app/components/app-sidebar-student";
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Page() {
    // Set initial moods state
    const [moods, ] = useState([
        { icon: "😲", percentage: "0.00", label: "Surprised", bgClass: "bg-gray-100/50" },
        { icon: "😊", percentage: "0.00", label: "Happy", bgClass: "bg-gray-100/50" },
        { icon: "😐", percentage: "0.00", label: "Neutral", bgClass: "bg-gray-100/50" },
        { icon: "😢", percentage: "0.00", label: "Sad", bgClass: "bg-gray-100/50" },
        { icon: "🤢", percentage: "0.00", label: "Disgusted", bgClass: "bg-gray-100/50" },
        { icon: "😡", percentage: "0.00", label: "Angry", bgClass: "bg-gray-100/50" },
        { icon: "😨", percentage: "0.00", label: "Fearful", bgClass: "bg-gray-100/50" }
    ]);

  const [, setCurrentTime] = useState(new Date());  

  useEffect(() => {
    // Update the time every second
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  // Add new state for completed and current classes
  const [completedClasses] = useState([
    { 
      id: 1, 
      name: "Introduction to Psychology",
      students: 35,
      emotions: {
        happy: 40,
        surprised: 25,
        neutral: 20
      }
    },
    { 
      id: 2, 
      name: "World History 101",
      students: 42,
      emotions: {
        happy: 35,
        surprised: 30,
        neutral: 25
      }
    },
    { 
      id: 3, 
      name: "Computer Programming",
      students: 22,
      emotions: {
        happy: 60,
        surprised: 40,
        neutral: 27
      }
    },
    { 
      id: 4, 
      name: "Entrepreneurship",
      students: 85,
      emotions: {
        happy: 56,
        surprised: 32,
        neutral: 30
      }
    },
    // Add more completed classes...
  ]);

  const [currentClasses] = useState([
    { 
      id: 1, 
      name: "Advanced Mathematics",
      students: 38,
      emotions: {
        happy: 32,
        surprised: 28,
        neutral: 30
      }
    },
    { 
      id: 2, 
      name: "English Literature",
      students: 45,
      emotions: {
        happy: 38,
        surprised: 22,
        neutral: 25
      }
    },
    // Add more current classes...
  ]);

  return (    
    <SidebarProvider>
      <AppSidebarStudent />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Dashboard
                  </BreadcrumbLink>
                </BreadcrumbItem>                
              </BreadcrumbList>              
            </Breadcrumb>            
          </div>          
            {/* Right Side: Icons and Profile Picture */}
          <div className="flex items-center space-x-4">
             {/* Notification Bell with Counter */}
              <div className="relative">
                {/* Bell Icon */}
                <button aria-label='botton' className="p-2 rounded-full hover:bg-gray-100">
                  <Bell className="w-6 h-6 text-gray-600" />
                </button>
              </div>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">            
            <div className="w-full">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {moods.map((mood, index) => (
                  <Card key={index} className="shadow-sm">
                    <CardContent className={`flex flex-col items-center justify-center h-full p-2 sm:p-4 ${mood.bgClass}`}>                    
                      <div className="flex items-center gap-1 sm:gap-2">
                        <span className="text-xl sm:text-2xl">{mood.icon}</span>
                        <span className="text-sm sm:text-lg font-semibold text-gray-800">{mood.label}</span>
                      </div>
                      <p className="text-sm sm:text-lg font-semibold text-gray-800">{mood.percentage}%</p>
                    </CardContent>
                  </Card>
                ))}
              </div>              
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5">
                <Card className="col-span-1 shadow-lg">
                  <CardContent className="p-3 sm:p-4">                      
                    <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-3 sm:mb-4 text-start">
                      Top Completed Classes with Positive Expressions
                    </h2>
                    <ScrollArea className="h-[400px] sm:h-[500px] pr-2 sm:pr-4">
                      <div className="space-y-3 sm:space-y-4">
                        {completedClasses.map((classItem) => (
                          <Card key={classItem.id} className="bg-gray-50">
                            <CardContent className="p-3 sm:p-4">
                              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                                <div>
                                  <p className="font-medium text-sm sm:text-base">{classItem.name}</p>
                                  <p className="text-xs sm:text-sm text-gray-600">{classItem.students} students enrolled</p>
                                </div>
                                <div className="flex gap-x-2 sm:gap-x-4 text-xs sm:text-sm">
                                  <span className="flex items-center">😊 {classItem.emotions.happy}%</span>
                                  <span className="flex items-center">😲 {classItem.emotions.surprised}%</span>
                                  <span className="flex items-center">😐 {classItem.emotions.neutral}%</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
                <Card className="cols-span-3 shadow-lg">
                  <CardContent className="p-4">
                    <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-start">Top Current Classes with Positive Expressions</h2>
                    <ScrollArea className="h-[500px] pr-4">
                      <div className="space-y-4">
                        {currentClasses.map((classItem) => (
                          <Card key={classItem.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="font-medium">{classItem.name}</p>
                                  <p className="text-sm text-gray-600">{classItem.students} students enrolled</p>
                                </div>
                                <div className="flex gap-x-4 text-sm">
                                  <span className="flex items-center">😊 {classItem.emotions.happy}%</span>
                                  <span className="flex items-center">😲 {classItem.emotions.surprised}%</span>
                                  <span className="flex items-center">😐 {classItem.emotions.neutral}%</span>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>                                
              </div>
            </div>          
        </div>
      </SidebarInset>
    </SidebarProvider>    
  );
}