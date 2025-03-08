'use client';

import { useState, useEffect } from 'react';
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
import Navbar from '../Navbar';
import Footer from '../Footer';
import SteppedProgress from '@/components/stepped-progress';
import BasicInfoStep from './steps/basic-info-step';
import PersonalityStep from './steps/personality-step';
import CheckoutStep from './steps/checkout-step';
import SuccessStep from './steps/success-step';

export default function ApplicationForm() {
  const { toast } = useToast();

  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    age: '',
    occupation: '',
    schoolInfo: '',
    attendedBefore: false,

    // Personality
    engagement: {
      different_values: 3,
      failure_learning: 3,
      different_experiences: 3,
    },
    tedTalkTopic: '',
    commitToParticipate: true,

    // Checkout
    registrationType: 'single', // single, group
    additionalAttendees: [],
    acceptedTerms: false,
  });

  // Validation errors state
  const [errors, setErrors] = useState({
    basicInfo: {},
    personality: {},
    checkout: {},
  });

  // Form submission
  const initialState = {};
  const [state, formAction, isPending] = useActionState(
    submitForm,
    initialState
  );

  // Show toast when form is submitted successfully
  useEffect(() => {
    if (state?.success) {
      toast({
        title: 'Application Submitted',
        description: 'Your application has been submitted successfully!',
        variant: 'success',
      });
    } else if (state?.error) {
      toast({
        title: 'Submission Error',
        description: state.error,
        variant: 'destructive',
      });
    }
  }, [state, toast]);

  const totalSteps = 4; // Including success step

  const handleNext = () => {
    if (currentStep < totalSteps) {
      // Only proceed if validation passes
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

    // Clear errors for fields that have been filled
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
      // Just navigate to next step without validation for now
      handleNext();
    } else {
      // For the final step, submit the form
      const formDataObj = new FormData();

      // Add all form data to FormData object
      Object.entries(formData).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          formDataObj.append(key, JSON.stringify(value));
        } else {
          formDataObj.append(key, String(value));
        }
      });

      // Submit and go to success step
      formAction(formDataObj);
      setCurrentStep(currentStep + 1); // Directly go to success step
    }
  };

  // Add validation function to check if current step is complete
  const validateCurrentStep = () => {
    let isValid = true;
    const newErrors = {};

    if (currentStep === 1) {
      // Validate Basic Info step
      if (!formData.firstName) {
        newErrors.firstName = 'First name is required';
        isValid = false;
      }
      if (!formData.lastName) {
        newErrors.lastName = 'Last name is required';
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
      if (!formData.tedTalkTopic) {
        newErrors.tedTalkTopic = 'Please share your TED Talk topic idea';
        isValid = false;
      }
      setErrors({ ...errors, personality: newErrors });
    } else if (currentStep === 3) {
      if (!formData.acceptedTerms) {
        newErrors.acceptedTerms = 'You must accept the terms to continue';
        isValid = false;
      }

      // If group registration, validate additional attendees
      if (
        formData.registrationType === 'group' &&
        formData.additionalAttendees.length > 0
      ) {
        const attendeeErrors = {};

        formData.additionalAttendees.forEach((attendee, index) => {
          if (!attendee.firstName || !attendee.lastName || !attendee.email) {
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
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex flex-col">
      <div className="flex-grow flex items-center justify-center py-16 px-4">
        <Card className="w-full max-w-4xl mx-auto border-none shadow-xl bg-white/5 backdrop-blur-sm">
          <CardHeader className="pb-2 px-8 pt-8">
            <CardTitle className="text-2xl text-white">
              TEDx Labyrinthine Application
            </CardTitle>
            <CardDescription className="text-gray-300">
              {getStepTitle()}
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <SteppedProgress
              numSteps={totalSteps - 1}
              stepsComplete={currentStep}
            />

            <form onSubmit={handleSubmit} className="mt-8 space-y-8">
              {state?.message && (
                <div className="p-4 text-sm text-green-500 bg-green-900/20 border border-green-800 rounded-md">
                  {state.message}
                </div>
              )}
              {state?.error && (
                <div className="p-4 text-sm text-red-500 bg-red-900/20 border border-red-800 rounded-md">
                  {state.error}
                </div>
              )}

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

              {currentStep === 4 && <SuccessStep />}

              {currentStep < totalSteps && (
                <div className="flex items-center justify-end gap-3 pt-8">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      className="px-6 py-3 rounded-md hover:bg-gray-800 text-gray-300 border border-gray-700 transition-colors"
                      onClick={handlePrevious}
                      disabled={isPending}
                    >
                      Previous
                    </button>
                  )}
                  <button
                    type={currentStep === totalSteps - 1 ? 'submit' : 'button'}
                    className="px-6 py-3 rounded-md bg-indigo-600 text-white hover:bg-indigo-700 transition-colors shadow-md"
                    onClick={
                      currentStep < totalSteps - 1 ? handleNext : undefined
                    }
                    disabled={isPending}
                  >
                    {isPending ? (
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
      <Footer />
    </div>
  );
}
