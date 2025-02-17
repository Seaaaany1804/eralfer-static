/* eslint-disable @next/next/no-img-element */
"use client";
import { AppSidebarTeacher } from "@/app//components/app-sidebar-teacher"
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
  teacherId: string;
}

const SubjectCard = ({ subject }: { subject: Subject }) => {
  const router = useRouter();
  const handleJoin = () => {
    router.push(`/teacher/my-classes/current/${subject.teacherId}`);
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
          <button 
            onClick={handleJoin}
            className={`absolute top-3 right-3 ${
              subject.status === 'ongoing' ? 'bg-white' : 'bg-gray-500'
            } text-black font-bold px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-gray-100 transition-colors`}
          >
            Join
          </button>
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
  const students = [
    "John Doe",
    "Jane Smith",
    "Bob Wilson",
    "Alice Johnson",
    "Charlie Brown",
    "Diana Prince",
  ];

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
      teacherId: "teacher123"
    },
  ];

  const filteredStudents = students.filter(student => 
    student.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedStudents.includes(student)
  );

  const handleAddStudent = (student: string) => {
    setSelectedStudents(prev => [...prev, student]);
    setSearchTerm("");
  };

  const handleRemoveStudent = (studentToRemove: string) => {
    setSelectedStudents(prev => 
      prev.filter(student => student !== studentToRemove)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Add your submission logic here
    console.log("Form Data:", formData);
    console.log("Selected Students:", selectedStudents);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setIsOpen(false);
      setFormData({
        title: "",
        code: "",
        time: "",
        image: ""
      });
      setSelectedStudents([]);
    }, 1000);
  };

  return (
    <SidebarProvider>
      <AppSidebarTeacher />
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
                  <BreadcrumbPage>Current</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex justify-between items-center px-4 mt-4 w-full">
            <h1 className="text-2xl font-bold">List of Subjects</h1>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
              <DialogTrigger asChild>
                <Button variant="default" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add New Class
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New Subject</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to add a new subject to your classes.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="e.g. Computer Programming 1"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="code">Description</Label>
                    <Input
                      id="code"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="e.g. CRP-2002024"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Schedule</Label>
                    <Input
                      id="time"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      placeholder="e.g. 8:00AM - 10:00AM"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="students">Student Attendees</Label>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedStudents.map((student) => (
                        <div
                          key={student}
                          className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                        >
                          <span className="text-sm">{student}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveStudent(student)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <Command className="border rounded-md">
                      <CommandInput
                        placeholder="Search students..."
                        value={searchTerm}
                        onValueChange={setSearchTerm}
                        className="border-none focus:ring-0"
                      />
                      {searchTerm && (
                        <CommandGroup className="max-h-40 overflow-auto">
                          {filteredStudents.length === 0 ? (
                            <CommandEmpty>No students found.</CommandEmpty>
                          ) : (
                            filteredStudents.map((student) => (
                              <CommandItem
                                key={student}
                                onSelect={() => handleAddStudent(student)}
                                className="cursor-pointer"
                              >
                                {student}
                              </CommandItem>
                            ))
                          )}
                        </CommandGroup>
                      )}
                    </Command>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Adding..." : "Add Subject"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
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