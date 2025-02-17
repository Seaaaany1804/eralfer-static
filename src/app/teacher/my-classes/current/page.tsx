"use client";
import { AppSidebarTeacher } from "@/app/components/app-sidebar-teacher"
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
import { Clock, Plus, X, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Student {
  id: number;
  name: string;
  grade: string;
  section: string;
}

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentStudents, setCurrentStudents] = useState<Student[]>([
    // Initial current students data
    { id: 7, name: "Anna Brown", grade: "Grade 10", section: "A" },
    { id: 8, name: "Michael Chen", grade: "Grade 10", section: "B" },
    { id: 9, name: "Sarah Johnson", grade: "Grade 10", section: "C" },
  ]);
  const [studentToRemove, setStudentToRemove] = useState<Student | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  // Simulated students data - replace with your actual data fetching logic
  const availableStudents = [
    { id: 1, name: "Emma Wilson", grade: "Grade 10", section: "A" },
    { id: 2, name: "James Anderson", grade: "Grade 10", section: "B" },
    { id: 3, name: "Sophia Garcia", grade: "Grade 10", section: "A" },
    { id: 4, name: "Lucas Martinez", grade: "Grade 10", section: "C" },
    { id: 5, name: "Olivia Thompson", grade: "Grade 10", section: "B" },
    { id: 6, name: "William Lee", grade: "Grade 10", section: "A" },
  ];

  const handleJoin = () => {
    router.push(`/teacher/my-classes/current/${subject.teacherId}`);
  };

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !currentStudents.some((selected) => selected.id === student.id)
  );

  const handleAddStudent = (student: Student) => {
    if (!currentStudents.some((selected) => selected.id === student.id)) {
      setCurrentStudents((prev) => [...prev, student]);
      setSearchQuery("");
    }
  };

  const handleRemoveInitiate = (student: Student) => {
    setStudentToRemove(student);
    setShowConfirmDialog(true);
  };

  const handleConfirmRemove = () => {
    if (studentToRemove) {
      setCurrentStudents((prev) => 
        prev.filter((student) => student.id !== studentToRemove.id)
      );
      setShowConfirmDialog(false);
      setStudentToRemove(null);
    }
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

          <div className="flex gap-2 mt-4">
            <Button
              variant="outline" 
              className="flex-1"
              onClick={() => router.push(`/teacher/my-classes/current/subjectDetails`)}
            >
              Details
            </Button>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="flex-1">
                  View Students
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Manage Students</DialogTitle>
                  <DialogDescription>
                    Add or remove students from {subject.title}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                  {/* Current Students */}
                  <div>
                    <Label>Current Students</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {currentStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                        >
                          <span className="text-sm">{student.name}</span>
                          <button
                            aria-label='bell'
                            type="button"
                            onClick={() => handleRemoveInitiate(student)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                      {currentStudents.length === 0 && (
                        <p className="text-sm text-gray-500">No students added yet</p>
                      )}
                    </div>
                  </div>

                  {/* Search and Add Students */}
                  <div className="space-y-2">
                    <Label>Add Students</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="text"
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                    <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <div
                            key={student.id}
                            className="p-2 border rounded hover:bg-secondary cursor-pointer"
                            onClick={() => handleAddStudent(student)}
                          >
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">
                              {student.grade} - Section {student.section}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-2">No students found</p>
                      )}
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Confirm Removal</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to remove {studentToRemove?.name} from this class?
                  </DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setShowConfirmDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={handleConfirmRemove}
                  >
                    Remove
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Page() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    code: "",
    time: "",
    image: ""
  });

  const availableStudents = [
    { id: 1, name: "Emma Wilson", grade: "Grade 10", section: "A" },
    { id: 2, name: "James Anderson", grade: "Grade 10", section: "B" },
    { id: 3, name: "Sophia Garcia", grade: "Grade 10", section: "A" },
    { id: 4, name: "Lucas Martinez", grade: "Grade 10", section: "C" },
    { id: 5, name: "Olivia Thompson", grade: "Grade 10", section: "B" },
    { id: 6, name: "William Lee", grade: "Grade 10", section: "A" },
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

  const filteredStudents = availableStudents.filter(
    (student) =>
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !selectedStudents.some((selected) => selected.id === student.id)
  );

  const handleAddStudent = (student: Student) => {
    if (!selectedStudents.some((selected) => selected.id === student.id)) {
      setSelectedStudents((prev) => [...prev, student]);
      setSearchQuery("");
    }
  };

  const handleRemoveStudent = (studentId: number) => {
    setSelectedStudents((prev) => 
      prev.filter((student) => student.id !== studentId)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Add your submission logic here
      console.log("Form Data:", formData);
      console.log("Selected Students:", selectedStudents);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsOpen(false);
      setFormData({
        title: "",
        code: "",
        time: "",
        image: ""
      });
      setSelectedStudents([]);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
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
                      required
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
                      required
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
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="students">Student Attendees</Label>
                    {/* Selected Students */}
                    <div className="flex flex-wrap gap-2 mb-2">
                      {selectedStudents.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center gap-1 bg-secondary px-2 py-1 rounded-md"
                        >
                          <span className="text-sm">{student.name}</span>
                          <button
                            aria-label='bell'
                            type="button"
                            onClick={() => handleRemoveStudent(student.id)}
                            className="text-muted-foreground hover:text-foreground"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                    {/* Search Input */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                      <Input
                        type="text"
                        placeholder="Search students..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 w-full"
                      />
                    </div>
                    {/* Display Filtered Students */}
                    <div className="mt-2 space-y-2 max-h-40 overflow-y-auto">
                      {filteredStudents.length > 0 ? (
                        filteredStudents.map((student) => (
                          <div
                            key={student.id}
                            className="p-2 border rounded hover:bg-secondary cursor-pointer"
                            onClick={() => handleAddStudent(student)}
                          >
                            <p className="font-medium">{student.name}</p>
                            <p className="text-sm text-gray-500">
                              {student.grade} - Section {student.section}
                            </p>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500 text-center py-2">No students found.</p>
                      )}
                    </div>
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