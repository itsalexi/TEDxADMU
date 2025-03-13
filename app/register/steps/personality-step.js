'use client';

import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';

export default function PersonalityStep({
  formData,
  updateFormData,
  errors = {},
}) {
  const handleEngagementChange = (question, value) => {
    updateFormData({
      ...formData,
      engagement: {
        ...formData.engagement,
        [question]: Number.parseInt(value),
      },
    });
  };

  const handleTextareaChange = (e) => {
    const { name, value } = e.target;
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCommitmentChange = (value) => {
    updateFormData({
      ...formData,
      commit_to_participate: value === 'yes',
    });
  };

  return (
    <div className="space-y-8">

      <div className="space-y-6">
        <div className="space-y-3 bg-white/5 p-5 rounded-md">
          <Label className="text-gray-300">
            I am comfortable engaging with people whose values and opinions
            differ from mine.
          </Label>
          <div className="grid grid-cols-5 gap-3 pt-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <RadioGroup
                  value={formData.engagement.different_values.toString()}
                  onValueChange={(val) =>
                    handleEngagementChange('different_values', val)
                  }
                >
                  <RadioGroupItem
                    value={value.toString()}
                    id={`different_values-${value}`}
                    className="mx-auto border-gray-600 text-indigo-500"
                  />
                </RadioGroup>
                <span className="text-xs mt-1 text-gray-400">{value}</span>
              </div>
            ))}
            <div className="col-span-5 flex justify-between text-xs pt-2 text-gray-500">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 bg-white/5 p-5 rounded-md">
          <Label className="text-gray-300">
            I believe that failure is an essential part of learning and growth.
          </Label>
          <div className="grid grid-cols-5 gap-3 pt-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <RadioGroup
                  value={formData.engagement.failure_learning.toString()}
                  onValueChange={(val) =>
                    handleEngagementChange('failure_learning', val)
                  }
                >
                  <RadioGroupItem
                    value={value.toString()}
                    id={`failure_learning-${value}`}
                    className="mx-auto border-gray-600 text-indigo-500"
                  />
                </RadioGroup>
                <span className="text-xs mt-1 text-gray-400">{value}</span>
              </div>
            ))}
            <div className="col-span-5 flex justify-between text-xs pt-2 text-gray-500">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        </div>

        <div className="space-y-3 bg-white/5 p-5 rounded-md">
          <Label className="text-gray-300">
            I am open to learning from people with vastly different life
            experiences than mine.
          </Label>
          <div className="grid grid-cols-5 gap-3 pt-3">
            {[1, 2, 3, 4, 5].map((value) => (
              <div key={value} className="flex flex-col items-center">
                <RadioGroup
                  value={formData.engagement.different_experiences.toString()}
                  onValueChange={(val) =>
                    handleEngagementChange('different_experiences', val)
                  }
                >
                  <RadioGroupItem
                    value={value.toString()}
                    id={`different_experiences-${value}`}
                    className="mx-auto border-gray-600 text-indigo-500"
                  />
                </RadioGroup>
                <span className="text-xs mt-1 text-gray-400">{value}</span>
              </div>
            ))}
            <div className="col-span-5 flex justify-between text-xs pt-2 text-gray-500">
              <span>Strongly Disagree</span>
              <span>Strongly Agree</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="ted_talk_topic" className="text-gray-300">
            If you could give a TED Talk on any topic, what would it be and why?
          </Label>
          <Textarea
            id="ted_talk_topic"
            name="ted_talk_topic"
            value={formData.ted_talk_topic}
            onChange={handleTextareaChange}
            className={`min-h-[150px] bg-white/10 border-gray-700 text-white py-3 ${
              errors.ted_talk_topic ? 'border-red-500' : ''
            }`}
            placeholder="Share your ideas and why they matter to you..."
            required
          />
          {errors.ted_talk_topic && (
            <p className="text-sm text-red-500 mt-1">{errors.ted_talk_topic}</p>
          )}
        </div>

        <div className="space-y-3 bg-white/5 p-5 rounded-md">
          <Label className="text-gray-300">
            TEDx attendees are expected to be present, engaged, and open-minded.
            Do you commit to fully participating in the event, including
            discussions and interactive segments?
          </Label>
          <RadioGroup
            value={formData.commit_to_participate ? 'yes' : 'no'}
            onValueChange={handleCommitmentChange}
            className="flex space-x-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="yes"
                id="commit-yes"
                className="border-gray-600 text-indigo-500"
              />
              <Label htmlFor="commit-yes" className="text-gray-300">
                Yes, I'm excited to engage!
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem
                value="no"
                id="commit-no"
                className="border-gray-600 text-indigo-500"
              />
              <Label htmlFor="commit-no" className="text-gray-300">
                I prefer to observe more than participate.
              </Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
