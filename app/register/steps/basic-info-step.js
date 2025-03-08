'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

export default function BasicInfoStep({
  formData,
  updateFormData,
  errors = {},
}) {
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    updateFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleRadioChange = (value) => {
    updateFormData({
      ...formData,
      attended_before: value === 'yes',
    });
  };

  return (
    <div className="space-y-8">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="first_name" className="text-gray-300">
            First Name
          </Label>
          <Input
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
            className={`bg-white/10 border-gray-700 text-white py-3 ${
              errors.first_name ? 'border-red-500' : ''
            }`}
            placeholder="Your first name"
          />
          {errors.first_name && (
            <p className="text-sm text-red-500 mt-1">{errors.first_name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="last_name" className="text-gray-300">
            Last Name
          </Label>
          <Input
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
            className={`bg-white/10 border-gray-700 text-white py-3 ${
              errors.last_name ? 'border-red-500' : ''
            }`}
            placeholder="Your last name"
          />
          {errors.last_name && (
            <p className="text-sm text-red-500 mt-1">{errors.last_name}</p>
          )}
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
          className={`bg-white/10 border-gray-700 text-white py-3 ${
            errors.email ? 'border-red-500' : ''
          }`}
          placeholder="your.email@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
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
          className={`bg-white/10 border-gray-700 text-white py-3 ${
            errors.phone ? 'border-red-500' : ''
          }`}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && (
          <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
        )}
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
            className={`bg-white/10 border-gray-700 text-white py-3 ${
              errors.age ? 'border-red-500' : ''
            }`}
            placeholder="Your age"
          />
          {errors.age && (
            <p className="text-sm text-red-500 mt-1">{errors.age}</p>
          )}
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
            className={`bg-white/10 border-gray-700 text-white py-3 ${
              errors.occupation ? 'border-red-500' : ''
            }`}
            placeholder="Your profession"
          />
          {errors.occupation && (
            <p className="text-sm text-red-500 mt-1">{errors.occupation}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="school_info" className="text-gray-300">
          School, Year, Course (For Students)
        </Label>
        <Input
          id="school_info"
          name="school_info"
          value={formData.school_info}
          onChange={handleChange}
          placeholder="Leave blank if not applicable"
          className="bg-white/10 border-gray-700 text-white py-3"
        />
        <p className="text-xs text-gray-500 mt-1">
          Only fill this if you're currently a student
        </p>
      </div>

      <div className="space-y-3 bg-white/5 p-5 rounded-md">
        <Label className="text-gray-300">
          Have you attended a TEDx event before?
        </Label>
        <RadioGroup
          value={formData.attended_before ? 'yes' : 'no'}
          onValueChange={handleRadioChange}
          className="flex space-x-4 pt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="yes"
              id="attended-yes"
              className="border-gray-600 text-indigo-500"
            />
            <Label htmlFor="attended-yes" className="text-gray-300">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="attended-no"
              className="border-gray-600 text-indigo-500"
            />
            <Label htmlFor="attended-no" className="text-gray-300">
              No
            </Label>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
