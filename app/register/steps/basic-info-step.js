'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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

  const handleSelectChange = (name, value) => {
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRadioChange = (value) => {
    updateFormData({
      ...formData,
      attended_before: value === 'yes',
    });
  };

  // Show school info only for Atenean or Scholar/AMA
  const showSchoolInfo = formData.is_atenean || formData.is_scholar_or_ama;

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
          Email Address{' '}
          {(formData.is_atenean || formData.is_scholar_or_ama) && (
            <span className="text-red-500">*must be an ateneo.edu email</span>
          )}
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
          placeholder={
            formData.is_atenean || formData.is_scholar_or_ama
              ? 'your.name@student.ateneo.edu (or other ateneo.edu domain)'
              : 'your.email@example.com'
          }
        />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email}</p>
        )}
        {(formData.is_atenean || formData.is_scholar_or_ama) && (
          <p className="text-xs text-gray-500 mt-1">
            Accepts any ateneo.edu email domain (e.g., student.ateneo.edu,
            obf.ateneo.edu)
          </p>
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

      {showSchoolInfo && (
        <div className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="school" className="text-gray-300">
              School
            </Label>
            <Select
              value={formData.school || ''}
              onValueChange={(value) => handleSelectChange('school', value)}
            >
              <SelectTrigger
                className={`w-full bg-white/10 border-gray-700 text-white ${
                  errors.school ? 'border-red-500' : ''
                }`}
              >
                <SelectValue placeholder="Select your school" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOSE">
                  School of Science and Engineering (SOSE)
                </SelectItem>
                <SelectItem value="RGL-SOSS">
                  Dr Rosita G Leong School of Social Sciences (RGL-SOSS)
                </SelectItem>
                <SelectItem value="SOH">School of Humanities (SOH)</SelectItem>
                <SelectItem value="JGSOM">
                  John Gokongwei School of Management (JGSOM)
                </SelectItem>
                <SelectItem value="GBSEALD">
                  Gokongwei Brothers School of Education and Learning Design
                  (GBSEALD)
                </SelectItem>
              </SelectContent>
            </Select>
            {errors.school && (
              <p className="text-sm text-red-500 mt-1">{errors.school}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="year_and_course" className="text-gray-300">
              Year and Course
            </Label>
            <Input
              id="year_and_course"
              name="year_and_course"
              value={formData.year_and_course || ''}
              onChange={handleChange}
              required={formData.is_atenean}
              placeholder="e.g., 3 BS Computer Science"
              className={`bg-white/10 border-gray-700 text-white py-3 ${
                errors.year_and_course ? 'border-red-500' : ''
              }`}
            />
            {errors.year_and_course && (
              <p className="text-sm text-red-500 mt-1">
                {errors.year_and_course}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">
              Format: Year followed by Course (e.g., 2 BS Management, 4 AB
              Literature)
            </p>
          </div>
        </div>
      )}

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
              className="border-gray-600 text-red-500"
            />
            <Label htmlFor="attended-yes" className="text-gray-300">
              Yes
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="no"
              id="attended-no"
              className="border-gray-600 text-red-500"
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
