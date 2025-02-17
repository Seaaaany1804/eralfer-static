"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarStudent } from "@/app/components/app-sidebar-student"
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import DonutChart from '@/components/donutchart';

export default function Page({  }: { params: { roomId: string } }) {
    const [moods] = useState([
        { icon: "😲", percentage: "25.00", label: "Surprised", bgClass: "bg-gray-100/50", color: "text-orange-500" },
        { icon: "😊", percentage: "15.00", label: "Happy", bgClass: "bg-gray-100/50", color: "text-green-500" },
        { icon: "😐", percentage: "20.00", label: "Neutral", bgClass: "bg-gray-100/50", color: "text-blue-500" },
        { icon: "😢", percentage: "10.00", label: "Sad", bgClass: "bg-gray-100/50", color: "text-purple-500" },
        { icon: "🤢", percentage: "8.00", label: "Disgusted", bgClass: "bg-gray-100/50", color: "text-zinc-700" },
        { icon: "😡", percentage: "12.00", label: "Angry", bgClass: "bg-gray-100/50", color: "text-red-500" },
        { icon: "😨", percentage: "10.00", label: "Fearful", bgClass: "bg-gray-100/50", color: "text-slate-500" }
    ]);

    const classesWithExpressions = [
        { name: "Mathematics 101", dominantExpression: "Happy", percentage: "85", students: 30 },
        { name: "Physics Advanced", dominantExpression: "Happy", percentage: "82", students: 25 },
        { name: "Chemistry Lab", dominantExpression: "Neutral", percentage: "75", students: 28 },
        { name: "Biology 201", dominantExpression: "Neutral", percentage: "70", students: 22 },
        { name: "Computer Science", dominantExpression: "Surprised", percentage: "65", students: 35 },
        { name: "English Literature", dominantExpression: "Sad", percentage: "55", students: 27 },
        { name: "History 101", dominantExpression: "Fearful", percentage: "45", students: 31 },
        { name: "Art Class", dominantExpression: "Disgusted", percentage: "40", students: 20 },
        { name: "Music Theory", dominantExpression: "Angry", percentage: "35", students: 24 },
        { name: "Physical Education", dominantExpression: "Angry", percentage: "30", students: 33 },
    ];

    const scheduleWithExpressions = [
        { title: "Introduction to Algebra", time: "09:00 AM", dominantExpression: "Happy", percentage: "88" },
        { title: "Chemical Reactions", time: "10:30 AM", dominantExpression: "Surprised", percentage: "82" },
        { title: "World War II Overview", time: "01:00 PM", dominantExpression: "Neutral", percentage: "75" },
        { title: "Programming Basics", time: "02:30 PM", dominantExpression: "Happy", percentage: "72" },
        { title: "Literature Analysis", time: "04:00 PM", dominantExpression: "Sad", percentage: "65" },
    ];

    const [, setCurrentTime] = useState(new Date());  
  
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (    
        <SidebarProvider>
            <AppSidebarStudent />
            <SidebarInset>
                <div className="h-screen flex flex-col">
                    <header className="flex h-16 shrink-0 items-center justify-between gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                            <Separator orientation="vertical" className="mr-2 h-4" />
                            <Breadcrumb className="text-black">
                                <BreadcrumbList>
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="/student">Dashboard</BreadcrumbLink>
                                    </BreadcrumbItem>  
                                    <BreadcrumbSeparator className="hidden md:block" />          
                                    <BreadcrumbItem className="hidden md:block">
                                        <BreadcrumbLink href="#">Computer Programming</BreadcrumbLink>
                                    </BreadcrumbItem>           
                                </BreadcrumbList>              
                            </Breadcrumb>            
                        </div>          
                        <div className="flex items-center space-x-4">
                            <div className="relative">
                                <button className="p-2 rounded-full hover:bg-gray-100">
                                    <Bell className="w-6 h-6 text-gray-600" />
                                </button>
                            </div>
                        </div>
                    </header>
                    <div className="flex-1 p-4 pt-0 overflow-y-auto">            
                        <div className="h-full">
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4 mb-4 sm:mb-6">
                                {moods.map((mood, index) => (
                                    <Card key={index} className="shadow-lg">
                                        <CardContent className={`flex flex-col items-center justify-center p-2 sm:p-4 rounded-[7px] ${mood.bgClass}`}>                    
                                            <p className="text-sm sm:text-lg font-semibold text-gray-800 mb-1 sm:mb-2">{mood.icon} {mood.label}</p>
                                            <div className="flex justify-center items-center py-1 sm:py-2">
                                                <DonutChart
                                                    value={parseFloat(mood.percentage)} 
                                                    color={mood.color}
                                                    size={80}
                                                    strokeWidth={8}
                                                />
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>              
                            
                            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-5 pb-6">
                                <Card className="col-span-1 shadow-lg h-[400px] sm:h-[600px]">
                                    <CardContent className="p-3 sm:p-6 h-full">                      
                                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Lesson Schedule</h2>
                                        <ScrollArea className="h-[calc(100%-2.5rem)] sm:h-[calc(100%-3rem)]">
                                            <div className="grid grid-cols-1 gap-3 sm:gap-4 pr-2 sm:pr-4">
                                                {scheduleWithExpressions.map((lesson, index) => (
                                                    <Card key={index} className="shadow-sm">
                                                        <CardContent className="p-3 sm:p-4">
                                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                                                <h3 className="font-medium text-sm sm:text-base">{lesson.title}</h3>
                                                                <span className="text-gray-500 text-xs sm:text-sm">{lesson.time}</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs sm:text-sm text-gray-600">Dominant: {lesson.dominantExpression}</span>
                                                                <span className="font-medium text-xs sm:text-sm">{lesson.percentage}%</span>
                                                            </div>
                                                        </CardContent>
                                                    </Card>
                                                ))}
                                            </div>
                                        </ScrollArea>
                                    </CardContent>
                                </Card>

                                <Card className="cols-span-1 shadow-lg h-[400px] sm:h-[600px]">
                                    <CardContent className="p-3 sm:p-6 h-full">
                                        <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Classes by Dominant Expression</h2>
                                        <ScrollArea className="h-[calc(100%-2.5rem)] sm:h-[calc(100%-3rem)]">
                                            <div className="grid grid-cols-1 gap-3 sm:gap-4 pr-2 sm:pr-4">
                                                {classesWithExpressions.map((class_, index) => (
                                                    <Card key={index} className="shadow-sm">
                                                        <CardContent className="p-3 sm:p-4">
                                                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2">
                                                                <h3 className="font-medium text-sm sm:text-base">{class_.name}</h3>
                                                                <span className="font-medium text-xs sm:text-sm">{class_.percentage}%</span>
                                                            </div>
                                                            <div className="flex justify-between items-center">
                                                                <span className="text-xs sm:text-sm text-gray-600">Dominant: {class_.dominantExpression}</span>
                                                                <span className="text-xs sm:text-sm text-gray-500">{class_.students} students</span>
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
                </div>
            </SidebarInset>
        </SidebarProvider>    
    );
}