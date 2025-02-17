/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @next/next/no-img-element */
"use client";
import { AppSidebarStudent } from "@/app//components/app-sidebar-student"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { CardContent } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Clock, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"

interface Subject {
  id: number;
  title: string;
  code: string;
  time: string;
  instructor: string;
  instructorimage: string;
  image: string;
  status: string;
  roomId: string;
}

const SubjectCard = ({ subject }: { subject: Subject }) => {
  const router = useRouter();
  const handleDetails = () => {
    router.push(`/student/my-classes/completed/${subject.roomId}`);
  };

  return (
     <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-0">
          <div className="relative">
            <img 
              src={subject.image}
              alt={subject.title}
              className="w-full h-48 rounded-2xl object-cover"
            /> 
          </div>
          
          <div className="p-4">
            <h3 className="font-semibold mb-2">
              {subject.title} - {subject.code}
            </h3>
            <div className="flex items-center text-gray-500 text-sm">
              <Clock size={16} className="mr-2" />
              {subject.time}
            </div>
            <div className="flex items-center mt-3">
              <img 
                src={subject.instructorimage}
                alt={subject.instructor}
                className="w-8 h-8 rounded-full mr-2"
              />
              <span className="text-sm text-gray-600">{subject.instructor}</span>
            </div>
            
            {/* New buttons section */}
            <div className="flex gap-2 mt-4">
              <Button
                variant="outline" 
                className="flex-1"
                onClick={() => {handleDetails()}}
              >
                Details
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
  );
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    time: "",
    image: ""
  });

  // Sample students data - replace with your actual data

  const subjects: Subject[] = [
    {
      id: 1,
      title: "Computer Programming 1",
      code: "CRP-2002024",
      time: "8:00AM - 10:00AM",
      instructor: "John Doe",
      instructorimage: "/images/user.png",
      image: "/images/subject-image.png",
      status: "ongoing",
      roomId: "CP-101"
    },
  ];






  return (
    <SidebarProvider>
      <AppSidebarStudent />
      <SidebarInset>
        <header className="flex flex-col h-16 mt-4 shrink-0 items-start gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>My Classes</BreadcrumbPage>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Completed</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex justify-between items-center px-4 mt-4 w-full">
            <h1 className="text-2xl font-bold">Completed Subjects</h1>
          </div>
          <div className="w-[100%] px-4">
            <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 mt-8">
              {subjects.map(subject => (
                <SubjectCard key={subject.id} subject={subject} />
              ))}
            </div>
          </div>
        </header>
      </SidebarInset>
    </SidebarProvider>
  );
}