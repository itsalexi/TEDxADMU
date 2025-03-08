"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function BasicInfoStep({ formData, updateFormData, errors = {} }) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    updateFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleRadioChange = (value) => {
    updateFormData({
      ...formData,
      attendedBefore: value === "yes",
    })
  }

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-white">Basic Information</h2>
        <p className="text-sm text-gray-400">We need some information to get to know you better</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-gray-300">
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className={`bg-white/10 border-gray-700 text-white py-3 ${errors.firstName ? "border-red-500" : ""}`}
            placeholder="Your first name"
          />
          {errors.firstName && <p className="text-sm text-red-500 mt-1">{errors.firstName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-gray-300">
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className={`bg-white/10 border-gray-700 text-white py-3 ${errors.lastName ? "border-red-500" : ""}`}
            placeholder="Your last name"
          />
          {errors.lastName && <p className="text-sm text-red-500 mt-1">{errors.lastName}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-gray-300">
          Email Address
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className={`bg-white/10 border-gray-700 text-white py-3 ${errors.email ? "border-red-500" : ""}`}
          placeholder="your.email@example.com"
        />
        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone" className="text-gray-300">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          className={`bg-white/10 border-gray-700 text-white py-3 ${errors.phone ? "border-red-500" : ""}`}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && <p className="text-sm text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="age" className="text-gray-300">
            Age
          </Label>
          <Input
            id="age"
            name="age"
            type="number"
            value={formData.age}
            onChange={handleChange}
            required
            className={`bg-white/10 border-gray-700 text-white py-3 ${errors.age ? "border-red-500" : ""}`}
            placeholder="Your age"
          />
          {errors.age && <p className="text-sm text-red-500 mt-1">{errors.age}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="occupation" className="text-gray-300">
            Occupation
          </Label>
          <Input
            id="occupation"
            name="occupation"
            value={formData.occupation}
            onChange={handleChange}
            required
            className={`bg-white/10 border-gray-700 text-white py-3 ${errors.occupation ? "border-red-500" : ""}`}
            placeholder="Your profession"
          />
          {errors.occupation && <p className="text-sm text-red-500 mt-1">{errors.occupation}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="schoolInfo" className="text-gray-300">
          School, Year, Course (For Students)
        </Label>
        <Input
          id="schoolInfo"
          name="schoolInfo"
          value={formData.schoolInfo}
          onChange={handleChange}
          placeholder="Leave blank if not applicable"
          className="bg-white/10 border-gray-700 text-white py-3"
        />
        <p className="text-xs text-gray-500 mt-1">Only fill this if you're currently a student</p>
      </div>

      <div className="space-y-3 bg-white/5 p-5 rounded-md">
        <Label className="text-gray-300">Have you attended a TEDx event before?</Label>
        <RadioGroup
          value={formData.attendedBefore ? "yes" : "no"}
          onValueChange={handleRadioChange}
          className="flex space-x-4 pt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="yes" id="attended-yes" className="border-gray-600 text-indigo-500" />
            <Label htmlFor="attended-yes" className="text-gray-300">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="no" id="attended-no" className="border-gray-600 text-indigo-500" />
            <Label htmlFor="attended-no" className="text-gray-300">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  )
}

