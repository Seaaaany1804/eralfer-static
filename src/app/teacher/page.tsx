"use client";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebarTeacher } from "@/app/components/app-sidebar-teacher"
import { Card, CardContent } from "@/components/ui/card";
import { Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Separator } from "@radix-ui/react-separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar } from "@/components/ui/avatar";
import { AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import DonutChart from '@/components/donutchart';

export default function Page() {
    const [moods] = useState([
        { icon: "😲", percentage: "25.00", label: "Surprised", bgClass: "bg-gray-100/50", color: "text-orange-500" },
        { icon: "😊", percentage: "15.00", label: "Happy", bgClass: "bg-gray-100/50", color: "text-green-500" },
        { icon: "😐", percentage: "20.00", label: "Neutral", bgClass: "bg-gray-100/50", color: "text-blue-500" },
        { icon: "😢", percentage: "10.00", label: "Sad", bgClass: "bg-gray-100/50", color: "text-purple-500" },
        { icon: "🤢", percentage: "8.00", label: "Disgusted", bgClass: "bg-gray-100/50", color: "text-zinc-700" },
        { icon: "😡", percentage: "12.00", label: "Angry", bgClass: "bg-gray-100/50", color: "text-red-500" },
        { icon: "😨", percentage: "10.00", label: "Fearful", bgClass: "bg-gray-100/50", color: "text-slate-500" }
    ]);

    const positiveClasses = [
        { name: "Mathematics 101", happiness: "85", students: 30 },
        { name: "Physics Advanced", happiness: "82", students: 25 },
        { name: "Chemistry Lab", happiness: "80", students: 28 },
        { name: "Biology 201", happiness: "78", students: 22 },
        { name: "Computer Science", happiness: "77", students: 35 },
        { name: "English Literature", happiness: "75", students: 27 },
        { name: "History 101", happiness: "73", students: 31 },
        { name: "Art Class", happiness: "72", students: 20 },
        { name: "Music Theory", happiness: "70", students: 24 },
        { name: "Physical Education", happiness: "69", students: 33 },
    ];

    const currentStudents = [
        { name: "Alice Johnson", id: "STU001", course: "Mathematics 101" },
        { name: "Bob Smith", id: "STU002", course: "Physics Advanced" },
        { name: "Carol White", id: "STU003", course: "Chemistry Lab" },
        { name: "David Brown", id: "STU004", course: "Biology 201" },
        { name: "Eve Wilson", id: "STU005", course: "Computer Science" },
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
            <AppSidebarTeacher />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center justify-between gap-2">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>                
                            </BreadcrumbList>              
                        </Breadcrumb>            
                    </div>          
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <button aria-label='bell' className="p-2 rounded-full hover:bg-gray-100">
                                <Bell className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0 overflow-hidden">            
                    <div className="w-full">
                        <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-7 gap-4 mb-6">
                            {moods.map((mood, index) => (
                                <Card key={index} className="shadow-lg">
                                    <CardContent className={`flex flex-col items-center justify-center p-4 rounded-[7px] ${mood.bgClass}`}>                    
                                        <p className="text-lg font-semibold text-gray-800 mb-2">{mood.icon} {mood.label}</p>
                                        <div className="flex justify-center items-center py-2">
                                            <DonutChart
                                                value={parseFloat(mood.percentage)} 
                                                color={mood.color}
                                                size={100}
                                                strokeWidth={10}
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>              
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                            <Card className="col-span-1 shadow-lg h-[700px] overflow-hidden">
                                <CardContent className="p-6 h-full flex flex-col">                      
                                    <h2 className="text-xl font-semibold mb-4">Current Students</h2>
                                    <ScrollArea className="flex-1">
                                        <div className="space-y-4 pr-4">
                                            {currentStudents.map((student, index) => (
                                                <div key={index} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                                                    <Avatar>
                                                        <AvatarImage src={`/api/placeholder/32/32`} />
                                                        <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="font-medium">{student.name}</p>
                                                        <p className="text-sm text-gray-500">ID: {student.id}</p>
                                                        <p className="text-sm text-gray-500">{student.course}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                            <Card className="col-span-1 shadow-lg h-[700px] overflow-hidden">
                                <CardContent className="p-6 h-full flex flex-col">
                                    <h2 className="text-xl font-semibold mb-4">Top 10 Classes with Positive Expression</h2>
                                    <ScrollArea className="flex-1">
                                        <div className="space-y-4 pr-4">
                                            {positiveClasses.map((class_, index) => (
                                                <div key={index} className="p-4 bg-gray-50 rounded-lg">
                                                    <div className="flex justify-between items-center mb-2">
                                                        <h3 className="font-medium">{class_.name}</h3>
                                                        <span className="text-green-600 font-medium">{class_.happiness}%</span>
                                                    </div>
                                                    <Progress 
                                                        value={parseFloat(class_.happiness)} 
                                                        className="h-2 w-full bg-green-100"
                                                    />
                                                    <p className="text-sm text-gray-500 mt-2">{class_.students} students</p>
                                                </div>
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