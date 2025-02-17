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

    // Function to determine chart size based on screen size
    const getChartSize = () => {
        if (typeof window !== 'undefined') {
            if (window.innerWidth < 640) return 60; // Small screens
            if (window.innerWidth < 1024) return 80; // Medium screens
            return 100; // Large screens
        }
        return 80; // Default fallback
    };

    // For client-side rendering only
    const [chartSize, setChartSize] = useState(80);

    useEffect(() => {
        // Set initial size
        setChartSize(getChartSize());
        
        // Update size on window resize
        const handleResize = () => {
            setChartSize(getChartSize());
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);
    
    return (    
        <SidebarProvider>
            <AppSidebarTeacher />
            <SidebarInset className="h-screen flex flex-col overflow-y-auto overflow-x-hidden">
                <header className="flex h-16 shrink-0 items-center justify-between gap-2 sticky top-0 bg-white z-10 px-2 sm:px-4">
                    <div className="flex items-center gap-2">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="/teacher">Dashboard</BreadcrumbLink>
                                </BreadcrumbItem>                
                            </BreadcrumbList>              
                        </Breadcrumb>            
                    </div>          
                    <div className="flex items-center">
                        <div className="relative">
                            <button aria-label='bell' className="p-2 rounded-full hover:bg-gray-100">
                                <Bell className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </header>
                <div className="flex-1 p-2 sm:p-4 pt-0">            
                    <div className="h-full flex flex-col gap-2 sm:gap-4">
                        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 sm:gap-4">
                            {moods.map((mood, index) => (
                                <Card key={index} className="shadow-lg">
                                    <CardContent className={`flex flex-col items-center justify-center p-2 sm:p-4 rounded-[7px] ${mood.bgClass}`}>                    
                                        <p className="text-xs sm:text-base lg:text-lg font-semibold text-gray-800 mb-1 sm:mb-2 text-center">
                                            <span className="block sm:inline">{mood.icon}</span> 
                                            <span className="text-xs sm:text-sm md:text-base">{mood.label}</span>
                                        </p>
                                        <div className="flex justify-center items-center py-1 sm:py-2">
                                            <div className="w-14 h-14 xs:w-16 xs:h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24">
                                                <DonutChart
                                                    value={parseFloat(mood.percentage)} 
                                                    color={mood.color}
                                                    size={chartSize}
                                                    strokeWidth={chartSize / 10}
                                                />
                                            </div>
                                        </div>
                                        <p className={`${mood.color} text-sm sm:text-base font-semibold mt-1`}>
                                            {mood.percentage}%
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>              
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 sm:gap-5 flex-1">
                            <Card className="col-span-1 shadow-lg overflow-hidden h-[60vh] sm:h-[65vh]">
                                <CardContent className="p-3 sm:p-6 h-full flex flex-col">                      
                                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Current Students</h2>
                                    <ScrollArea className="flex-1">
                                        <div className="space-y-2 sm:space-y-4 pr-2 sm:pr-4">
                                            {currentStudents.map((student, index) => (
                                                <Card key={index} className="shadow-sm">
                                                    <CardContent className="p-2 sm:p-4">
                                                        <div className="flex items-center space-x-2 sm:space-x-4 p-2 sm:p-3 rounded-lg">
                                                            <Avatar>
                                                                <AvatarImage src={`/api/placeholder/32/32`} />
                                                                <AvatarFallback>{student.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                            </Avatar>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="font-medium text-sm sm:text-base truncate">{student.name}</p>
                                                                <p className="text-xs sm:text-sm text-gray-500 truncate">ID: {student.id}</p>
                                                                <p className="text-xs sm:text-sm text-gray-500 truncate">{student.course}</p>
                                                            </div>
                                                        </div>
                                                    </CardContent>
                                                </Card>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                            <Card className="col-span-1 shadow-lg overflow-hidden h-[60vh] sm:h-[65vh]">
                                <CardContent className="p-3 sm:p-6 h-full flex flex-col">
                                    <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">Top 10 Classes with Positive Expression</h2>
                                    <ScrollArea className="flex-1">
                                        <div className="grid grid-cols-1 gap-2 sm:gap-4 pr-2 sm:pr-4">
                                            {positiveClasses.map((class_, index) => (
                                                <Card key={index} className="shadow-sm">
                                                    <CardContent className="p-2 sm:p-4">
                                                        <div className="flex justify-between items-center">
                                                            <div className="flex-1 min-w-0 mr-2">
                                                                <h3 className="font-medium text-sm sm:text-base truncate">{class_.name}</h3>
                                                                <p className="text-xs sm:text-sm text-gray-500 mt-1 truncate">{class_.students} students</p>
                                                            </div>
                                                            <div className="flex flex-col items-center">
                                                                <span className="text-green-600 font-medium text-base sm:text-lg whitespace-nowrap">
                                                                    {class_.happiness}%
                                                                </span>
                                                                <h1 className="text-xs sm:text-sm text-gray-500 mt-1">Happy</h1>
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