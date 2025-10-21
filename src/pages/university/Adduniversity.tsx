"use client";

import { useState } from "react";
import ComponentCard from "../../components/common/ComponentCard";
import DatePicker from "../../components/form/date-picker";
import Input from "../../components/form/input/InputField";
import Label from "../../components/form/Label";
import LexicalEditor from "../../components/lexicalEditor/Lexicaleditor";


export default function CreateUniversityForm() {
  const [form, setForm] = useState({
    name: "",
    slug: "",
    country: "",
    city: "",
    ranking: "",
    tuitionMin: "",
    tuitionMax: "",
    acceptanceRate: "",
    studentCount: "",
    description: "",
    programs: [] as string[],
    programInput: "",
    image:"",
    
    applicationDeadline: "",
  });

  const [loading, setLoading] = useState(false);

  // Auto-generate slug when name changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name === "name") {
      const slug = value
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "");
      setForm({ ...form, name: value, slug });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Programs
  const handleAddProgram = () => {
    const val = form.programInput.trim();
    if (val && !form.programs.includes(val)) {
      setForm({ ...form, programs: [...form.programs, val], programInput: "" });
    }
  };
  const handleRemoveProgram = (idx: number) => {
    const newPrograms = [...form.programs];
    newPrograms.splice(idx, 1);
    setForm({ ...form, programs: newPrograms });
  };

  // Images
 


  // Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = {
        ...form,
        ranking: Number(form.ranking) || null,
        tuitionMin: Number(form.tuitionMin) || null,
        tuitionMax: Number(form.tuitionMax) || null,
        acceptanceRate: Number(form.acceptanceRate) || null,
        studentCount: Number(form.studentCount) || null,
        programs: form.programs,
        image: form.image,
        applicationDeadline: form.applicationDeadline ? new Date(form.applicationDeadline) : null,
      };

      const res = await fetch("http://localhost:5000/api/universities", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("University created:", data);
      
     

      setForm({
        name: "",
        slug: "",
        country: "",
        city: "",
        ranking: "",
        tuitionMin: "",
        tuitionMax: "",
        acceptanceRate: "",
        studentCount: "",
        description: "",
        programs: [],
        programInput: "",
        image: "",
      
        applicationDeadline: "",
      });
    } catch (error) {
      console.error("Error creating university:", error);
      alert("Failed to create university.");
    } finally {
      setLoading(false);
       alert("University created successfully!");
    }
  };


  return (
    <ComponentCard title="Create University">
      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Name & Slug */}
        <div>
          <Label htmlFor="name">University Name</Label>
          <Input type="text" id="name" name="name" value={form.name} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input type="text" id="slug" name="slug" value={form.slug} onChange={handleChange}  />
        </div>

        {/* Country & City */}
        <div>
          <Label htmlFor="country">Country</Label>
          <Input type="text" id="country" name="country" value={form.country} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="city">City</Label>
          <Input type="text" id="city" name="city" value={form.city} onChange={handleChange} />
        </div>

        {/* Ranking, Tuition, Acceptance Rate, Student Count */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="ranking">Ranking</Label>
            <Input type="number" id="ranking" name="ranking" value={form.ranking} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="studentCount">Student Count</Label>
            <Input type="number" id="studentCount" name="studentCount" value={form.studentCount} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="tuitionMin">Tuition Min</Label>
            <Input type="number" id="tuitionMin" name="tuitionMin" value={form.tuitionMin} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="tuitionMax">Tuition Max</Label>
            <Input type="number" id="tuitionMax" name="tuitionMax" value={form.tuitionMax} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="acceptanceRate">Acceptance Rate (%)</Label>
            <Input type="number" id="acceptanceRate" name="acceptanceRate" value={form.acceptanceRate} onChange={handleChange} />
          </div>
        </div>

        {/* Description */}
        <div>
          <Label htmlFor="description">Description</Label>
          <LexicalEditor
    value={form.description}
    onChange={(value) => setForm({ ...form, description: value })}
  />
        </div>

        {/* Programs */}
        <div>
          <Label>Programs</Label>
          <div className="flex gap-2">
            <Input type="text" name="programInput" value={form.programInput} onChange={handleChange} placeholder="Add a program" />
            <button type="button" onClick={handleAddProgram} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Add
            </button>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {form.programs.map((program, idx) => (
              <span key={idx} className="flex items-center gap-1 bg-gray-200 px-2 py-1 rounded">
                {program}
                <button type="button" onClick={() => handleRemoveProgram(idx)} className="text-red-500 font-bold">×</button>
              </span>
            ))}
          </div>
        </div>

        {/* Images */}
        <div>
          <Label>Images (URLs)</Label>
          <div className="flex gap-2">
            <Input type="text" name="image" value={form.image} onChange={handleChange} placeholder="Add image URL" />
           
          </div>
         
        </div>

        {/* Application Deadline */}
        <div>
          <DatePicker
            id="applicationDeadline"
            label="Application Deadline"
            placeholder="Select date"
            onChange={(currentDateString) => setForm({ ...form, applicationDeadline: currentDateString as any })}
          />
        </div>

        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
          {loading ? "Saving..." : "Create University"}
        </button>
      </form>
    </ComponentCard>
  );
}
