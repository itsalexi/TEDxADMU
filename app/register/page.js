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
import Footer from '../Footer';
import SteppedProgress from '@/components/stepped-progress';
import BasicInfoStep from './steps/basic-info-step';
import PersonalityStep from './steps/personality-step';
import CheckoutStep from './steps/checkout-step';
import SuccessStep from './steps/success-step';

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
    school_info: '',
    attended_before: false,

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
    is_scholar_or_ama: false,
    cost: 0,
  });

  const [errors, setErrors] = useState({
    basicInfo: {},
    personality: {},
    checkout: {},
  });

  const initialState = {};
  const [state, formAction, isPending] = useActionState(
    submitForm,
    initialState
  );

  useEffect(() => {
    if (state.message === 'Form submitted successfully!') {
      toast({
        title: 'Application Submitted',
        description: state.message,
        variant: 'success',
      });

      if (currentStep === 3) {
        setCurrentStep(4);
      }
      setIsSubmitting(false);
    } else if (state?.error) {
      toast({
        title: 'Submission Error',
        description: state.error,
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  }, [state, toast, currentStep]);

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      if (validateCurrentStep()) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
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
      const newErrors = { ...errors.personality };
      Object.keys(stepData).forEach((field) => {
        if (stepData[field] && newErrors[field]) {
          delete newErrors[field];
        }
      });
      setErrors({ ...errors, personality: newErrors });
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

    if (currentStep < totalSteps - 1) {
      handleNext();
    } else {
      if (validateCurrentStep()) {
        setIsSubmitting(true);

        const formDataObj = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
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

    if (currentStep === 1) {
      if (!formData.first_name) {
        newErrors.first_name = 'First name is required';
        isValid = false;
      }
      if (!formData.last_name) {
        newErrors.last_name = 'Last name is required';
        isValid = false;
      }
      if (!formData.email) {
        newErrors.email = 'Email is required';
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        isValid = false;
      }
      if (!formData.phone) {
        newErrors.phone = 'Phone number is required';
        isValid = false;
      }
      if (!formData.age) {
        newErrors.age = 'Age is required';
        isValid = false;
      }
      if (!formData.occupation) {
        newErrors.occupation = 'Occupation is required';
        isValid = false;
      }

      setErrors({ ...errors, basicInfo: newErrors });
    } else if (currentStep === 2) {
      if (!formData.ted_talk_topic) {
        newErrors.ted_talk_topic = 'Please share your TED Talk topic idea';
        isValid = false;
      }
      setErrors({ ...errors, personality: newErrors });
    } else if (currentStep === 3) {
      if (!formData.accepted_terms) {
        newErrors.acceptedTerms = 'You must accept the terms to continue';
        isValid = false;
      }

      if (
        formData.registration_type === 'group' &&
        formData.additional_attendees.length > 0
      ) {
        const attendeeErrors = {};

        formData.additional_attendees.forEach((attendee, index) => {
          if (!attendee.first_name || !attendee.last_name || !attendee.email) {
            attendeeErrors[attendee.id] =
              'Please complete all fields for this attendee';
            isValid = false;
          }
        });

        if (Object.keys(attendeeErrors).length > 0) {
          newErrors.attendees = attendeeErrors;
        }
      }
      setErrors({ ...errors, checkout: newErrors });
    }

    if (!isValid) {
      toast({
        title: 'Please fix the errors',
        description: 'There are some fields that need your attention',
        variant: 'destructive',
      });
    }

    return isValid;
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1:
        return 'Tell us about yourself';
      case 2:
        return 'Share your thoughts and perspectives';
      case 3:
        return 'Complete your registration';
      case 4:
        return 'Application submitted';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900">
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
              <SteppedProgress
                numSteps={totalSteps - 1}
                stepsComplete={currentStep}
              />

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
                    {currentStep === 1 && "We need some information to get to know you better"}
                    {currentStep === 2 && "Share your perspective and ideas with us"}
                    {currentStep === 3 && "Choose your registration type and complete payment details"}
                    {currentStep === 4 && "Thank you for your application"}
                  </p>
                </div>

                {currentStep === 1 && (
                  <BasicInfoStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors.basicInfo}
                  />
                )}

                {currentStep === 2 && (
                  <PersonalityStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors.personality}
                  />
                )}

                {currentStep === 3 && (
                  <CheckoutStep
                    formData={formData}
                    updateFormData={updateFormData}
                    errors={errors.checkout}
                  />
                )}

                {currentStep === 4 && <SuccessStep formData={formData} />}

                {currentStep < totalSteps && (
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
                      ) : currentStep === totalSteps - 1 ? (
                        'Submit Application'
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
      <Footer />
    </div>
  );
}
