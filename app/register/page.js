'use client';

import { useState, useEffect, startTransition } from 'react';
import { useActionState } from 'react';
import { submitForm } from '@/lib/actions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import SteppedProgress from '@/components/stepped-progress';
import BasicInfoStep from './steps/basic-info-step';
import PersonalityStep from './steps/personality-step';
import CheckoutStep from './steps/checkout-step';
import SuccessStep from './steps/success-step';
import DiscountEligibilityStep from './steps/discount-eligibility-step';
import ParticlesBackground from '../ParticlesBackground';

export default function ApplicationForm() {
  const { toast } = useToast();

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    reference_no: Math.random().toString(36).substring(2, 10).toUpperCase(),
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    school: '',
    year_and_course: '',
    attended_before: false,
    is_scholar_or_ama: false,
    is_atenean: false,

    engagement: {
      different_values: 3,
      failure_learning: 3,
      different_experiences: 3,
    },
    ted_talk_topic: '',
    commit_to_participate: true,

    registration_type: 'single', // single, group
    additional_attendees: [],
    accepted_terms: false,
    cost: 0,
  });

  console.log(formData);

  const [errors, setErrors] = useState({
    basicInfo: {},
    personality: {},
    checkout: {},
    discountEligibility: {},
  });

  const initialState = {};
  const [state, formAction, isPending] = useActionState(
    submitForm,
    initialState
  );

  useEffect(() => {
    if (state.message === 'Form submitted successfully!') {
      toast({
        title: '🎉 Registration Submitted Successfully!',
        description:
          'Thank you for registering for TEDxADMU! You will receive a confirmation email shortly with further instructions.',
        variant: 'success',
        duration: 6000,
      });

      setCurrentStep(5);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (state?.error) {
      toast({
        title: '❌ Submission Error',
        description: `${state.error} Please try again or contact support if the issue persists.`,
        variant: 'destructive',
        duration: 8000,
      });
      setIsSubmitting(false);
    }
  }, [state, toast]);

  const totalSteps = 5;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (validateCurrentStep()) {
        setCurrentStep(currentStep + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateFormData = (stepData) => {
    setFormData({
      ...formData,
      ...stepData,
    });

    if (currentStep === 1) {
      const newErrors = { ...errors.basicInfo };
      Object.keys(stepData).forEach((field) => {
        if (stepData[field] && newErrors[field]) {
          delete newErrors[field];
        }
      });
      setErrors({ ...errors, basicInfo: newErrors });
    } else if (currentStep === 2) {
      const newErrors = { ...errors.basicInfo };
      Object.keys(stepData).forEach((field) => {
        if (stepData[field] && newErrors[field]) {
          delete newErrors[field];
        }
      });
      setErrors({ ...errors, basicInfo: newErrors });
    } else if (currentStep === 3) {
      const newErrors = { ...errors.checkout };
      Object.keys(stepData).forEach((field) => {
        if (stepData[field] && newErrors[field]) {
          delete newErrors[field];
        }
      });
      setErrors({ ...errors, checkout: newErrors });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentStep < 4) {
      handleNext();
    } else if (currentStep === 4) {
      if (validateCurrentStep()) {
        setIsSubmitting(true);

        const formDataObj = new FormData();

        const dataToSubmit = {
          ...formData,
          additional_attendees:
            formData.registration_type === 'group'
              ? formData.additional_attendees
              : [],
        };

        Object.entries(dataToSubmit).forEach(([key, value]) => {
          if (typeof value === 'object' && value !== null) {
            formDataObj.append(key, JSON.stringify(value));
          } else {
            formDataObj.append(key, String(value));
          }
        });

        startTransition(() => {
          formAction(formDataObj);
        });
      }
    }
  };

  const validateCurrentStep = () => {
    let isValid = true;
    const newErrors = {};

    // Skip validation for success step
    if (currentStep === 5) {
      return true;
    }

    if (currentStep === 1) {
      // Discount eligibility validation - at least one option must be selected
      const hasDiscount = formData.is_scholar_or_ama || formData.is_atenean;
      const noDiscountSelected =
        !formData.is_scholar_or_ama && !formData.is_atenean;
      if (!hasDiscount && !noDiscountSelected) {
        newErrors.discount = 'Please select your registration category';
        isValid = false;
      }
      setErrors({ ...errors, discountEligibility: newErrors });
    } else if (currentStep === 2) {
      // Basic info validation
      const requiredFields = {
        first_name: 'First name is required',
        last_name: 'Last name is required',
        email: 'Email is required',
        phone: 'Phone number is required',
        age: 'Age is required',
        occupation: 'Occupation is required',
      };

      // Add school fields as required for Ateneans and Scholar/AMA
      if (formData.is_atenean || formData.is_scholar_or_ama) {
        requiredFields.school = 'School is required';
        requiredFields.year_and_course = 'Year and Course is required';
      }

      Object.entries(requiredFields).forEach(([field, message]) => {
        if (!formData[field]) {
          newErrors[field] = message;
          isValid = false;
        }
      });

      // Email format validation
      if (formData.email) {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
          newErrors.email = 'Please enter a valid email address';
          isValid = false;
        } else if (
          (formData.is_atenean || formData.is_scholar_or_ama) &&
          !formData.email.toLowerCase().match(/@[^.]+\.ateneo\.edu$/)
        ) {
          newErrors.email = 'Must be an ateneo.edu email address';
          isValid = false;
        }
      }

      // Age validation
      if (formData.age) {
        const age = parseInt(formData.age);
        if (isNaN(age) || age < 13 || age > 120) {
          newErrors.age = 'Please enter a valid age between 13 and 120';
          isValid = false;
        }
      }

      // Phone number validation
      if (formData.phone && !/^[+]?[\d\s-()]{8,}$/.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone number';
        isValid = false;
      }

      // Year and Course validation
      if (
        (formData.is_atenean || formData.is_scholar_or_ama) &&
        formData.year_and_course
      ) {
        if (!/^[1-5]\s+[A-Za-z\s]+$/.test(formData.year_and_course)) {
          newErrors.year_and_course =
            'Please enter a valid year and course (e.g., 3 BS Computer Science)';
          isValid = false;
        }
      }

      setErrors({ ...errors, basicInfo: newErrors });
    } else if (currentStep === 3) {
      // Personality step validation
      if (
        !formData.ted_talk_topic ||
        formData.ted_talk_topic.trim().length < 10
      ) {
        newErrors.ted_talk_topic =
          'Please share your TED Talk topic idea (minimum 10 characters)';
        isValid = false;
      }

      // Validate engagement scores
      const engagementFields = [
        'different_values',
        'failure_learning',
        'different_experiences',
      ];
      engagementFields.forEach((field) => {
        if (
          !formData.engagement[field] ||
          formData.engagement[field] < 1 ||
          formData.engagement[field] > 5
        ) {
          newErrors[field] = 'Please rate your engagement level (1-5)';
          isValid = false;
        }
      });

      setErrors({ ...errors, personality: newErrors });
    } else if (currentStep === 4) {
      // Checkout step validation
      if (!formData.accepted_terms) {
        newErrors.accepted_terms = 'You must accept the terms to continue';
        isValid = false;
      }

      if (formData.registration_type === 'group') {
        if (
          !formData.additional_attendees ||
          formData.additional_attendees.length === 0
        ) {
          newErrors.additional_attendees =
            'Group registration requires at least one additional attendee';
          isValid = false;
        } else {
          const attendeeErrors = {};
          formData.additional_attendees.forEach((attendee, index) => {
            const attendeeValidationErrors = {};

            // Required fields validation
            if (!attendee.first_name)
              attendeeValidationErrors.first_name = 'First name is required';
            if (!attendee.last_name)
              attendeeValidationErrors.last_name = 'Last name is required';
            if (!attendee.email)
              attendeeValidationErrors.email = 'Email is required';
            if (!attendee.age) attendeeValidationErrors.age = 'Age is required';
            if (!attendee.occupation)
              attendeeValidationErrors.occupation = 'Occupation is required';
            if (!attendee.phone)
              attendeeValidationErrors.phone = 'Phone number is required';

            // Email validation
            if (attendee.email) {
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(attendee.email)) {
                attendeeValidationErrors.email =
                  'Please enter a valid email address';
              } else if (
                (formData.is_atenean || formData.is_scholar_or_ama) &&
                !attendee.email.toLowerCase().match(/@[^.]+\.ateneo\.edu$/)
              ) {
                attendeeValidationErrors.email =
                  'Must be an ateneo.edu email address';
              }
            }

            // Age validation
            if (attendee.age) {
              const age = parseInt(attendee.age);
              if (isNaN(age) || age < 13 || age > 120) {
                attendeeValidationErrors.age =
                  'Please enter a valid age between 13 and 120';
              }
            }

            // Phone number validation
            if (attendee.phone && !/^[+]?[\d\s-()]{8,}$/.test(attendee.phone)) {
              attendeeValidationErrors.phone =
                'Please enter a valid phone number';
            }

            // Special validation for Ateneans and AMA/Scholars
            if (formData.is_atenean || formData.is_scholar_or_ama) {
              if (!attendee.school) {
                attendeeValidationErrors.school =
                  'School is required for Ateneans and AMA/Scholars';
              }
              if (!attendee.year_and_course) {
                attendeeValidationErrors.year_and_course =
                  'Year and Course is required for Ateneans and AMA/Scholars';
              } else if (
                !/^[1-5]\s+[A-Za-z\s]+$/.test(attendee.year_and_course)
              ) {
                attendeeValidationErrors.year_and_course =
                  'Please enter a valid year and course (e.g., 3 BS Computer Science)';
              }
            }

            if (Object.keys(attendeeValidationErrors).length > 0) {
              attendeeErrors[index] = attendeeValidationErrors;
              isValid = false;
            }
          });

          if (Object.keys(attendeeErrors).length > 0) {
            newErrors.attendees = attendeeErrors;
          }
        }
      }

      setErrors({ ...errors, checkout: newErrors });
    }

    if (!isValid) {
      toast({
        title: '⚠️ Validation Error',
        description:
          'Please check and fix the highlighted fields before proceeding.',
        variant: 'destructive',
        duration: 5000,
      });
    }

    return isValid;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Discount Eligibility';
      case 2:
        return 'Tell us about yourself';
      case 3:
        return 'Share your thoughts and perspectives';
      case 4:
        return 'Complete your registration';
      case 5:
        return 'Registration submitted';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <ParticlesBackground />

      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-none shadow-xl bg-white/5 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.02]">
                <div className="w-[200%] aspect-square transform rotate-45">
                  <div className="absolute top-1/2 left-0 w-full h-32 -translate-y-1/2 bg-gradient-to-r from-transparent via-white to-transparent"></div>
                  <div className="absolute top-0 left-1/2 h-full w-32 -translate-x-1/2 bg-gradient-to-b from-transparent via-white to-transparent"></div>
                </div>
              </div>
            </div>
            <CardContent className="p-8 relative z-10">
              {currentStep < 5 && (
                <SteppedProgress numSteps={4} stepsComplete={currentStep} />
              )}

              <form
                action={formAction}
                onSubmit={handleSubmit}
                className="mt-8 space-y-8"
              >
                {state?.error && (
                  <div className="p-4 text-sm text-red-500 bg-red-900/20 border border-red-800 rounded-md">
                    {state.error}
                  </div>
                )}

                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold text-white">
                    {getStepTitle()}
                  </h2>
                  <p className="text-sm text-gray-400">
                    {currentStep === 1 &&
                      'Select your registration category to determine your discount eligibility'}
                    {currentStep === 2 &&
                      'We need some information to get to know you better'}
                    {currentStep === 3 &&
                      'Share your perspective and ideas with us'}
                    {currentStep === 4 &&
                      'Choose your registration type and complete payment details'}
                    {currentStep === 5 && 'Thank you for your registration'}
                  </p>
                </div>

                {currentStep === 1 && (
                  <DiscountEligibilityStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors.discountEligibility}
                  />
                )}

                {currentStep === 2 && (
                  <BasicInfoStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors.basicInfo}
                  />
                )}

                {currentStep === 3 && (
                  <PersonalityStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors.personality}
                  />
                )}

                {currentStep === 4 && (
                  <CheckoutStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors.checkout}
                  />
                )}

                {currentStep === 5 && <SuccessStep formData={formData} />}

                {currentStep < 5 && (
                  <div className="flex items-center justify-end gap-3 pt-8 border-t border-gray-800">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        className="px-6 py-3 rounded-md hover:bg-gray-800 text-gray-300 border border-gray-700 transition-colors"
                        onClick={handlePrevious}
                        disabled={isSubmitting}
                      >
                        Previous
                      </button>
                    )}
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-md bg-red-600 text-white hover:bg-red-700 transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </span>
                      ) : currentStep === 4 ? (
                        'Submit Registration'
                      ) : (
                        'Next'
                      )}
                    </button>
                  </div>
                )}
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
