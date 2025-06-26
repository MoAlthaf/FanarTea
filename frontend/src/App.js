import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [language, setLanguage] = useState('arabic');
  const [isRTL, setIsRTL] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Language content
  const content = {
    arabic: {
      nav: {
        home: 'الرئيسية',
        careerDiscovery: 'اكتشاف المهن',
        cvGenerator: 'مولد السيرة الذاتية',
        interviewTrainer: 'مدرب المقابلات',
        jobVerifier: 'تحقق من العرض',
        about: 'عن المشروع'
      },
      home: {
        title: 'واصلة',
        subtitle: 'تمكين الشباب بأدوات مهنية أخلاقية',
        description: 'واصلة تساعدك على اكتشاف مستقبلك المهني مع البقاء وفياً لقيمك',
        cta1: 'ابدأ رحلتك',
        cta2: 'جرب مولد السيرة الذاتية',
        cta3: 'تحقق من العرض الوظيفي',
        getStarted: 'ابدأ الآن',
        whyArabic: {
          title: 'لماذا الدعم المهني العربي؟',
          languageBarrier: {
            title: 'حاجز اللغة',
            description: 'يواجه الكثير من الشباب العربي صعوبة في التعبير عن أهدافهم المهنية بالإنجليزية'
          },
          culturalSensitivity: {
            title: 'الحساسية الثقافية',
            description: 'نحن نفهم الاحتياجات الإسلامية والعربية المحددة في سوق العمل اليوم'
          }
        },
        features: {
          title: 'مميزات واصلة',
          subtitle: 'انضم إلى آلاف الشباب الذين يبنون مستقبلهم المهني مع واصلة',
          careerChat: {
            title: 'دردشة اكتشاف المهن',
            description: 'اكتشف مهنتك المثالية من خلال محادثة ذكية'
          },
          arabicCV: {
            title: 'مولد السيرة الذاتية العربية',
            description: 'أنشئ سيرة ذاتية احترافية باللغة العربية'
          },
          islamicVerifier: {
            title: 'مدقق التوافق الإسلامي',
            description: 'تأكد من توافق الوظائف مع القيم الإسلامية'
          },
          interviewPractice: {
            title: 'تدريب المقابلات بالعربية',
            description: 'تدرب على المقابلات بلغتك الأم'
          }
        },
        callToAction: {
          title: 'ابدأ مجاناً',
          subtitle: 'انضم إلى آلاف الشباب الذين يبنون مستقبلهم المهني مع واصلة'
        }
      },
      careerDiscovery: {
        title: 'اكتشاف المهن',
        subtitle: 'اكتشف المهنة المثالية لك بناءً على اهتماماتك',
        interestsLabel: 'ما هي اهتماماتك؟',
        interestsPlaceholder: 'مثال: أحب الحيوانات، العلوم، التعامل مع الناس، الفن...',
        submitBtn: 'احصل على توصيات مهنية',
        askMoreBtn: 'اسأل المزيد',
        analyzing: 'جاري التحليل...',
        skillsNeeded: 'المهارات المطلوبة:',
        expectedSalary: 'الراتب المتوقع:'
      },
      cvGenerator: {
        title: 'مولد السيرة الذاتية العربية',
        subtitle: 'أنشئ سيرة ذاتية احترافية بالذكاء الاصطناعي',
        smartTitle: 'مولد السيرة الذاتية الذكي',
        smartSubtitle: 'أنشئ سيرة ذاتية احترافية في 3 خطوات بسيطة',
        step1Title: 'اختر قالب السيرة الذاتية',
        step1Subtitle: 'اختر التصميم الذي يناسب مجالك المهني',
        step2Title: 'اختر لغة السيرة الذاتية',
        step2Subtitle: 'حدد اللغة التي تريد إنشاء السيرة الذاتية بها',
        step3Title: 'معلومات السيرة الذاتية',
        livePreview: 'معاينة مباشرة',
        templates: {
          classic: 'كلاسيكي',
          modern: 'حديث',
          creative: 'إبداعي'
        },
        fullName: 'الاسم الكامل',
        jobTitle: 'المسمى الوظيفي',
        skills: 'المهارات',
        experience: 'الخبرة',
        fullNamePlaceholder: 'أدخل اسمك الكامل',
        jobTitlePlaceholder: 'مثال: مطور برمجيات',
        skillsPlaceholder: 'مثال: JavaScript, Python, React...',
        experiencePlaceholder: 'اكتب خبراتك العملية...',
        previewPlaceholders: {
          name: 'اسم المتقدم',
          jobTitle: 'المسمى الوظيفي',
          skills: 'المهارات التقنية والشخصية...',
          experience: 'تفاصيل الخبرة العملية والإنجازات...'
        },
        buttons: {
          previous: 'السابق',
          generate: 'إنشاء السيرة الذاتية',
          generating: 'جاري الإنشاء...',
          download: 'تحميل السيرة الذاتية',
          newCV: 'إنشاء سيرة ذاتية جديدة'
        },
        success: {
          title: 'تم إنشاء السيرة الذاتية بنجاح!',
          subtitle: 'جاهزة للتحميل بصيغة Word'
        },
        errors: {
          fullNameRequired: 'الاسم الكامل مطلوب',
          jobTitleRequired: 'المسمى الوظيفي مطلوب',
          skillsRequired: 'المهارات مطلوبة',
          experienceRequired: 'الخبرة مطلوبة'
        }
      },
      interviewTrainer: {
        title: 'مدرب المقابلات',
        subtitle: 'تدرب على المقابلات مع الذكاء الاصطناعي',
        recordBtn: 'سجل إجابتك',
        question: 'حدثني عن نفسك وخبراتك المهنية',
        feedbackTitle: 'تقييم الذكاء الاصطناعي',
        simulator: 'مُحاكي مقابلة العمل',
        score: 'التقييم:',
        feedback: 'ملاحظات:',
        suggestions: 'اقتراحات للتحسين:',
        mockFeedback: 'إجابة جيدة! يمكنك تحسين الثقة في الصوت وإضافة المزيد من الأمثلة العملية.',
        mockSuggestions: [
          'استخدم أمثلة محددة من خبرتك',
          'تحدث بثقة أكبر',
          'اربط إجابتك بمتطلبات الوظيفة'
        ]
      },
      jobVerifier: {
        title: 'تحقق من توافق العرض الوظيفي',
        subtitle: 'تأكد من توافق العرض الوظيفي مع القيم الإسلامية',
        jobOfferLabel: 'الصق وصف الوظيفة أو العرض',
        jobOfferPlaceholder: 'الصق نص العرض الوظيفي هنا...',
        uploadLabel: 'أو ارفع ملف (اختياري)',
        submitBtn: 'تحقق من التوافق',
        compliant: '✅ متوافق مع الشريعة',
        nonCompliant: '⚠️ غير متوافق بالكامل',
        explanationTitle: 'التفسير:',
        recommendationsTitle: 'التوصيات:',
        mockExplanation: 'هذا العرض الوظيفي متوافق مع أحكام الشريعة الإسلامية. لا يحتوي على أنشطة محرمة مثل الربا أو بيع المحرمات.',
        mockRecommendations: [
          'تأكد من مواعيد الصلاة في بيئة العمل',
          'اسأل عن السياسات المتعلقة بالإجازات الدينية'
        ]
      },
      about: {
        title: 'عن واصلة',
        description: 'نحن منصة رقمية مبتكرة تهدف إلى تمكين الشباب العربي من بناء مستقبل مهني ناجح متوائم مع القيم الإسلامية. أدواتنا المدعومة بالذكاء الاصطناعي متاحة وأخلاقية ومدركة ثقافياً.',
        mission: 'مهمتنا',
        missionText: 'سد الفجوة بين التكنولوجيا الحديثة والثقافة العربية الإسلامية من خلال توفير أدوات ذكية تساعد الشباب العربي على اكتشاف المهن وبناء السير الذاتية والتدريب على المقابلات - كل ذلك مع البقاء وفياً لقيمهم.',
        innovation: 'الابتكار والثقافة',
        innovationText: 'نجمع بين أحدث تقنيات الذكاء الاصطناعي والفهم العميق للثقافة العربية الإسلامية',
        impact: 'الأثر المجتمعي',
        impactText: 'نساعد آلاف الشباب العربي على بناء مستقبل مهني ناجح يتماشى مع قيمهم وتطلعاتهم'
      }
    },
    english: {
      nav: {
        home: 'Home',
        careerDiscovery: 'Career Discovery',
        cvGenerator: 'CV Generator',
        interviewTrainer: 'Interview Trainer',
        jobVerifier: 'Job Verifier',
        about: 'About'
      },
      home: {
        title: 'Wasila',
        subtitle: 'Empowering Youth with Ethical Career Tools',
        description: 'Wasila helps you discover your future while staying true to your values',
        cta1: 'Start Your Journey',
        cta2: 'Try CV Generator',
        cta3: 'Verify Job Offer',
        getStarted: 'Get Started',
        whyArabic: {
          title: 'Why Arabic Career Support?',
          languageBarrier: {
            title: 'Language Barrier',
            description: 'Many Arabic youth face difficulty expressing their career goals in English'
          },
          culturalSensitivity: {
            title: 'Cultural Sensitivity',
            description: 'We understand the Islamic and Arab-specific needs in today\'s workforce'
          }
        },
        features: {
          title: 'Wasila Features',
          subtitle: 'Join thousands of youth building their careers with Wasila',
          careerChat: {
            title: 'Career Discovery Chat',
            description: 'Discover your ideal career through intelligent conversation'
          },
          arabicCV: {
            title: 'Arabic CV Generator',
            description: 'Create professional resumes in Arabic'
          },
          islamicVerifier: {
            title: 'Islamic Job Verifier',
            description: 'Ensure job compatibility with Islamic values'
          },
          interviewPractice: {
            title: 'Interview Practice in Arabic',
            description: 'Practice interviews in your native language'
          }
        },
        callToAction: {
          title: 'Get Started for Free',
          subtitle: 'Join thousands of youth building their careers with Wasila'
        }
      },
      careerDiscovery: {
        title: 'Career Discovery',
        subtitle: 'Discover your perfect career based on your interests',
        interestsLabel: 'What are your interests?',
        interestsPlaceholder: 'Example: I love animals, science, working with people, art...',
        submitBtn: 'Get Career Recommendations',
        askMoreBtn: 'Ask more',
        analyzing: 'Analyzing...',
        skillsNeeded: 'Skills needed:',
        expectedSalary: 'Expected salary:'
      },
      cvGenerator: {
        title: 'Arabic CV Generator',
        subtitle: 'Create a professional CV with AI',
        smartTitle: 'Smart CV Generator',
        smartSubtitle: 'Create a professional CV in 3 simple steps',
        step1Title: 'Choose CV Template',
        step1Subtitle: 'Select the design that suits your professional field',
        step2Title: 'Choose CV Language',
        step2Subtitle: 'Select the language you want to create your CV in',
        step3Title: 'Resume Information',
        livePreview: 'Live Preview',
        templates: {
          classic: 'Classic',
          modern: 'Modern',
          creative: 'Creative'
        },
        fullName: 'Full Name',
        jobTitle: 'Job Title',
        skills: 'Skills',
        experience: 'Experience',
        fullNamePlaceholder: 'Enter your full name',
        jobTitlePlaceholder: 'e.g., Software Developer',
        skillsPlaceholder: 'e.g., JavaScript, Python, React...',
        experiencePlaceholder: 'Describe your work experience...',
        previewPlaceholders: {
          name: 'Applicant Name',
          jobTitle: 'Job Title',
          skills: 'Technical and soft skills...',
          experience: 'Work experience details and achievements...'
        },
        buttons: {
          previous: 'Previous',
          generate: 'Generate CV',
          generating: 'Generating...',
          download: 'Download CV',
          newCV: 'Create New CV'
        },
        success: {
          title: 'CV Generated Successfully!',
          subtitle: 'Ready to download in Word format'
        },
        errors: {
          fullNameRequired: 'Full name is required',
          jobTitleRequired: 'Job title is required',
          skillsRequired: 'Skills are required',
          experienceRequired: 'Experience is required'
        }
      },
      interviewTrainer: {
        title: 'Interview Trainer',
        subtitle: 'Practice interviews with AI',
        recordBtn: 'Record Your Answer',
        question: 'Tell me about yourself and your professional experience',
        feedbackTitle: 'AI Feedback',
        simulator: 'Job Interview Simulator',
        score: 'Score:',
        feedback: 'Feedback:',
        suggestions: 'Suggestions for improvement:',
        mockFeedback: 'Good answer! You can improve voice confidence and add more practical examples.',
        mockSuggestions: [
          'Use specific examples from your experience',
          'Speak with more confidence',
          'Connect your answer to job requirements'
        ]
      },
      jobVerifier: {
        title: 'Job Offer Verifier',
        subtitle: 'Ensure job offers align with Islamic values',
        jobOfferLabel: 'Paste job offer or description',
        submitBtn: 'Check Compliance',
        compliant: '✅ Sharia Compliant',
        nonCompliant: '⚠️ Not fully compliant'
      },
      about: {
        title: 'About Wasila',
        description: 'We are an innovative digital platform aimed at empowering Arabic youth to build a successful professional future aligned with Islamic values. Our AI-based tools are accessible, ethical, and culturally aware.',
        mission: 'Our Mission',
        missionText: 'To bridge the gap between modern technology and Arab-Islamic culture by providing smart tools that help Arabic youth discover careers, build resumes, and train for interviews—all while staying true to their values.',
        innovation: 'Innovation & Culture',
        innovationText: 'We combine cutting-edge AI technology with deep understanding of Arab-Islamic culture',
        impact: 'Community Impact',
        impactText: 'We help thousands of Arabic youth build successful careers that align with their values and aspirations'
      }
    }
  };

  const toggleLanguage = () => {
    const newLang = language === 'arabic' ? 'english' : 'arabic';
    setLanguage(newLang);
    setIsRTL(newLang === 'arabic');
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const t = content[language];

  // State for different pages
  const [careerResults, setCareerResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // CV Generator state
  const [cvStep, setCvStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [cvLanguage, setCvLanguage] = useState('arabic');
  const [cvData, setCvData] = useState({
    fullName: '', jobTitle: '', skills: '', experience: ''
  });
  const [cvErrors, setCvErrors] = useState({});
  const [generatedCVFile, setGeneratedCVFile] = useState(null);
  const [isGeneratingCV, setIsGeneratingCV] = useState(false);
  
  const [interviewFeedback, setInterviewFeedback] = useState(null);
  const [jobVerifierResult, setJobVerifierResult] = useState(null);

  // Mock API calls (will be replaced with your Fanar AI integration)
  const handleCareerDiscovery = async (interests) => {
    setIsLoading(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/career-recommendation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          interests: interests,
          language: language // Send the interface language to backend
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setCareerResults(result.careers);
      } else {
        // Fallback to mock data
        const mockCareers = language === 'arabic' ? [
          {
            title: 'مطور برمجيات',
            description: 'تطوير التطبيقات والمواقع الإلكترونية باستخدام أحدث التقنيات',
            skills_needed: ['البرمجة', 'حل المشكلات', 'العمل الجماعي'],
            salary_range: '15,000 - 25,000 ريال'
          },
          {
            title: 'مصمم جرافيك',
            description: 'إنشاء التصميمات البصرية للعلامات التجارية والمنتجات',
            skills_needed: ['الإبداع', 'برامج التصميم', 'التواصل البصري'],
            salary_range: '8,000 - 18,000 ريال'
          }
        ] : [
          {
            title: 'Software Developer',
            description: 'Develop applications and websites using the latest technologies',
            skills_needed: ['Programming', 'Problem Solving', 'Teamwork'],
            salary_range: '$4,000 - $6,500'
          },
          {
            title: 'Graphic Designer',
            description: 'Create visual designs for brands and products',
            skills_needed: ['Creativity', 'Design Software', 'Visual Communication'],
            salary_range: '$2,200 - $4,800'
          }
        ];
        setCareerResults(mockCareers);
      }
    } catch (error) {
      console.error('Career Discovery Error:', error);
      // Fallback to mock data
      const mockCareers = language === 'arabic' ? [
        {
          title: 'مطور برمجيات',
          description: 'تطوير التطبيقات والمواقع الإلكترونية باستخدام أحدث التقنيات',
          skills_needed: ['البرمجة', 'حل المشكلات', 'العمل الجماعي'],
          salary_range: '15,000 - 25,000 ريال'
        },
        {
          title: 'مصمم جرافيك',
          description: 'إنشاء التصميمات البصرية للعلامات التجارية والمنتجات',
          skills_needed: ['الإبداع', 'برامج التصميم', 'التواصل البصري'],
          salary_range: '8,000 - 18,000 ريال'
        }
      ] : [
        {
          title: 'Software Developer',
          description: 'Develop applications and websites using the latest technologies',
          skills_needed: ['Programming', 'Problem Solving', 'Teamwork'],
          salary_range: '$4,000 - $6,500'
        },
        {
          title: 'Graphic Designer',
          description: 'Create visual designs for brands and products',
          skills_needed: ['Creativity', 'Design Software', 'Visual Communication'],
          salary_range: '$2,200 - $4,800'
        }
      ];
      setCareerResults(mockCareers);
    } finally {
      setIsLoading(false);
    }
  };


  // CV Generator Functions
  const validateCVForm = () => {
    const errors = {};
    const cvContent = language === 'arabic' ? content.arabic : content.english;
    
    if (!cvData.fullName.trim()) errors.fullName = cvContent.cvGenerator.errors.fullNameRequired;
    if (!cvData.jobTitle.trim()) errors.jobTitle = cvContent.cvGenerator.errors.jobTitleRequired;
    if (!cvData.skills.trim()) errors.skills = cvContent.cvGenerator.errors.skillsRequired;
    if (!cvData.experience.trim()) errors.experience = cvContent.cvGenerator.errors.experienceRequired;
    
    setCvErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCVGeneration = async () => {
    if (!validateCVForm()) return;
    
    setIsGeneratingCV(true);
    
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;
      const response = await fetch(`${backendUrl}/api/generate-cv`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: cvData.fullName,
          career_goal: cvData.jobTitle,
          skills: cvData.skills,
          experience: cvData.experience,
          education: '', // Can be added later
          languages: [cvLanguage === 'arabic' ? 'العربية' : 'English'],
          cv_language: cvLanguage,
          interface_language: language // Send the interface language to backend
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // Simulate file generation for now
        setGeneratedCVFile({
          filename: `${cvData.fullName}_CV.docx`,
          downloadUrl: '#', // This would be the actual file URL from backend
          generated: true,
          cv_id: result.cv_id
        });
      } else {
        // Fallback to mock generation
        setGeneratedCVFile({
          filename: `${cvData.fullName}_CV.docx`,
          downloadUrl: '#',
          generated: true
        });
      }
    } catch (error) {
      console.error('CV Generation Error:', error);
      // Fallback to mock generation
      setGeneratedCVFile({
        filename: `${cvData.fullName}_CV.docx`,
        downloadUrl: '#',
        generated: true
      });
    } finally {
      setIsGeneratingCV(false);
    }
  };

  const downloadCV = () => {
    // In real implementation, this would download the actual file
    const message = cvLanguage === 'arabic' 
      ? 'تم تحميل السيرة الذاتية بنجاح!' 
      : 'CV downloaded successfully!';
    alert(message);
  };

  const resetCVGenerator = () => {
    setCvStep(1);
    setSelectedTemplate(null);
    setCvLanguage('arabic');
    setCvData({ fullName: '', jobTitle: '', skills: '', experience: '' });
    setCvErrors({});
    setGeneratedCVFile(null);
    setIsGeneratingCV(false);
  };

  const renderHomePage = () => (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-50 via-emerald-50 to-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-emerald-500/5"></div>
        <div className="relative container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">W</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-blue-600 via-emerald-600 to-blue-700 bg-clip-text text-transparent mb-6">
              {t.home.title}
            </h1>
            <p className="text-2xl md:text-4xl text-gray-700 mb-8 font-medium">
              {t.home.subtitle}
            </p>
            <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              {t.home.description}
            </p>
            
            {/* Primary CTA */}
            <button 
              onClick={() => setCurrentPage('careerDiscovery')}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-12 py-4 rounded-2xl text-xl font-semibold hover:from-blue-600 hover:to-emerald-600 transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl mb-8"
            >
              {t.home.cta1}
            </button>
          </div>
        </div>
        
        {/* Hero Image */}
        <div className="mt-16 container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
              <img src="https://images.unsplash.com/photo-1712802666269-86b60e108288" alt="Arabic Professional" className="w-full h-80 object-cover rounded-2xl"/>
            </div>
          </div>
        </div>
      </div>

      {/* Why Arabic Career Support Section */}
      <div className="py-20 bg-gradient-to-r from-blue-500 to-emerald-500">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            {t.home.whyArabic.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🗣️</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.home.whyArabic.languageBarrier.title}</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {t.home.whyArabic.languageBarrier.description}
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 border border-white/20">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6">
                <span className="text-3xl">🕌</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t.home.whyArabic.culturalSensitivity.title}</h3>
              <p className="text-white/90 text-lg leading-relaxed">
                {t.home.whyArabic.culturalSensitivity.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">{t.home.features.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.home.features.subtitle}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">💬</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{t.home.features.careerChat.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{t.home.features.careerChat.description}</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">📄</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{t.home.features.arabicCV.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{t.home.features.arabicCV.description}</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">✅</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{t.home.features.islamicVerifier.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{t.home.features.islamicVerifier.description}</p>
            </div>
            
            <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🎤</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">{t.home.features.interviewPractice.title}</h3>
              <p className="text-gray-600 text-center leading-relaxed">{t.home.features.interviewPractice.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-emerald-500 to-blue-500">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {t.home.callToAction.title}
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-12">
              {t.home.callToAction.subtitle}
            </p>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
              <button 
                onClick={() => setCurrentPage('careerDiscovery')}
                className="bg-white text-blue-600 px-12 py-4 rounded-2xl text-xl font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
              >
                {t.home.getStarted}
              </button>
              <button 
                onClick={() => setCurrentPage('cvGenerator')}
                className="bg-white/10 text-white border-2 border-white/30 px-12 py-4 rounded-2xl text-xl font-semibold hover:bg-white/20 transform hover:scale-105 transition-all backdrop-blur-sm"
              >
                {t.home.cta2}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCareerDiscovery = () => (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t.careerDiscovery.title}</h1>
            <p className="text-xl text-gray-600">{t.careerDiscovery.subtitle}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={(e) => {
              e.preventDefault();
              const interests = e.target.interests.value;
              handleCareerDiscovery(interests);
            }}>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  {t.careerDiscovery.interestsLabel}
                </label>
                <textarea 
                  name="interests"
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none resize-none h-32"
                  placeholder={t.careerDiscovery.interestsPlaceholder}
                  required
                />
              </div>
              
              <button 
                type="submit" 
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 text-white py-4 rounded-xl text-lg font-semibold hover:from-emerald-600 hover:to-green-700 transition-all disabled:opacity-50"
              >
                {isLoading ? t.careerDiscovery.analyzing : t.careerDiscovery.submitBtn}
              </button>
            </form>
          </div>
          
          {/* Results */}
          {careerResults.length > 0 && (
            <div className="grid md:grid-cols-2 gap-6">
              {careerResults.map((career, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <h3 className="text-2xl font-bold text-emerald-600 mb-3">{career.title}</h3>
                  <p className="text-gray-600 mb-4">{career.description}</p>
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-700 mb-2">{t.careerDiscovery.skillsNeeded}</h4>
                    <div className="flex flex-wrap gap-2">
                      {career.skills_needed.map((skill, i) => (
                        <span key={i} className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-sm">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-gray-800">{t.careerDiscovery.expectedSalary} {career.salary_range}</p>
                  <button className="mt-4 bg-emerald-500 text-white px-6 py-2 rounded-lg hover:bg-emerald-600 transition-all">
                    {t.careerDiscovery.askMoreBtn}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderCVGenerator = () => {
    const cvContent = language === 'arabic' ? content.arabic : content.english;
    
    // CV Template options
    const templates = [
      { id: 1, name: cvContent.cvGenerator.templates.classic, preview: '📄', color: 'blue' },
      { id: 2, name: cvContent.cvGenerator.templates.modern, preview: '🎨', color: 'emerald' },
      { id: 3, name: cvContent.cvGenerator.templates.creative, preview: '✨', color: 'purple' }
    ];

    // Step 1: Template Selection
    const renderTemplateSelection = () => (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{cvContent.cvGenerator.step1Title}</h2>
          <p className="text-gray-600">{cvContent.cvGenerator.step1Subtitle}</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {templates.map((template) => (
            <div
              key={template.id}
              onClick={() => {
                setSelectedTemplate(template);
                setCvStep(2);
              }}
              className={`relative p-8 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 backdrop-blur-sm border-2 ${
                selectedTemplate?.id === template.id
                  ? `border-${template.color}-500 bg-${template.color}-50/50 shadow-${template.color}/20`
                  : 'border-gray-200 bg-white/60 hover:border-gray-300'
              } shadow-lg hover:shadow-2xl`}
            >
              <div className="text-center">
                <div className="text-6xl mb-4">{template.preview}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {template.name}
                </h3>
                <div className={`w-12 h-1 bg-gradient-to-r from-${template.color}-400 to-${template.color}-600 mx-auto rounded-full`}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // Step 2: Language Selection
    const renderLanguageSelection = () => (
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">{cvContent.cvGenerator.step2Title}</h2>
          <p className="text-gray-600">{cvContent.cvGenerator.step2Subtitle}</p>
        </div>
        
        <div className="flex justify-center space-x-6 space-x-reverse">
          <button
            onClick={() => {
              setCvLanguage('arabic');
              setCvStep(3);
            }}
            className={`px-12 py-8 rounded-2xl text-xl font-semibold transition-all duration-300 backdrop-blur-sm border-2 ${
              cvLanguage === 'arabic'
                ? 'border-emerald-500 bg-emerald-50/50 text-emerald-700 shadow-emerald/20'
                : 'border-gray-200 bg-white/60 text-gray-600 hover:border-emerald-300'
            } shadow-lg hover:shadow-xl`}
          >
            <div className="text-4xl mb-2">🇸🇦</div>
            العربية
          </button>
          
          <button
            onClick={() => {
              setCvLanguage('english');
              setCvStep(3);
            }}
            className={`px-12 py-8 rounded-2xl text-xl font-semibold transition-all duration-300 backdrop-blur-sm border-2 ${
              cvLanguage === 'english'
                ? 'border-blue-500 bg-blue-50/50 text-blue-700 shadow-blue/20'
                : 'border-gray-200 bg-white/60 text-gray-600 hover:border-blue-300'
            } shadow-lg hover:shadow-xl`}
          >
            <div className="text-4xl mb-2">🇺🇸</div>
            English
          </button>
        </div>
      </div>
    );

    // Step 3: CV Form
    const renderCVForm = () => (
      <div className={`grid lg:grid-cols-2 gap-8 ${cvLanguage === 'arabic' ? 'rtl' : 'ltr'}`}>
        {/* Form */}
        <div className="space-y-6">
          <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {cvContent.cvGenerator.step3Title}
            </h3>
            
            <div className="space-y-6">
              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  {cvContent.cvGenerator.fullName}
                </label>
                <input
                  type="text"
                  value={cvData.fullName}
                  onChange={(e) => setCvData({...cvData, fullName: e.target.value})}
                  className={`w-full p-4 rounded-xl border-2 focus:outline-none backdrop-blur-sm bg-white/70 transition-all ${
                    cvErrors.fullName ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder={cvContent.cvGenerator.fullNamePlaceholder}
                />
                {cvErrors.fullName && <p className="text-red-500 text-sm mt-1">{cvErrors.fullName}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  {cvContent.cvGenerator.jobTitle}
                </label>
                <input
                  type="text"
                  value={cvData.jobTitle}
                  onChange={(e) => setCvData({...cvData, jobTitle: e.target.value})}
                  className={`w-full p-4 rounded-xl border-2 focus:outline-none backdrop-blur-sm bg-white/70 transition-all ${
                    cvErrors.jobTitle ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder={cvContent.cvGenerator.jobTitlePlaceholder}
                />
                {cvErrors.jobTitle && <p className="text-red-500 text-sm mt-1">{cvErrors.jobTitle}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  {cvContent.cvGenerator.skills}
                </label>
                <textarea
                  value={cvData.skills}
                  onChange={(e) => setCvData({...cvData, skills: e.target.value})}
                  className={`w-full p-4 rounded-xl border-2 focus:outline-none backdrop-blur-sm bg-white/70 transition-all resize-none h-32 ${
                    cvErrors.skills ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder={cvContent.cvGenerator.skillsPlaceholder}
                />
                {cvErrors.skills && <p className="text-red-500 text-sm mt-1">{cvErrors.skills}</p>}
              </div>

              <div>
                <label className="block font-semibold text-gray-700 mb-2">
                  {cvContent.cvGenerator.experience}
                </label>
                <textarea
                  value={cvData.experience}
                  onChange={(e) => setCvData({...cvData, experience: e.target.value})}
                  className={`w-full p-4 rounded-xl border-2 focus:outline-none backdrop-blur-sm bg-white/70 transition-all resize-none h-40 ${
                    cvErrors.experience ? 'border-red-400 focus:border-red-500' : 'border-gray-200 focus:border-blue-500'
                  }`}
                  placeholder={cvContent.cvGenerator.experiencePlaceholder}
                />
                {cvErrors.experience && <p className="text-red-500 text-sm mt-1">{cvErrors.experience}</p>}
              </div>
            </div>
          </div>
        </div>

        {/* Live Preview */}
        <div className="space-y-6">
          <div className={`bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-gray-200 min-h-[600px] ${selectedTemplate?.color === 'blue' ? 'border-l-4 border-l-blue-500' : selectedTemplate?.color === 'emerald' ? 'border-l-4 border-l-emerald-500' : 'border-l-4 border-l-purple-500'}`}>
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              {cvContent.cvGenerator.livePreview}
            </h3>
            
            <div className={`space-y-6 ${cvLanguage === 'arabic' ? 'text-right' : 'text-left'}`}>
              <div>
                <h2 className={`text-3xl font-bold mb-2 ${selectedTemplate?.color === 'blue' ? 'text-blue-600' : selectedTemplate?.color === 'emerald' ? 'text-emerald-600' : 'text-purple-600'}`}>
                  {cvData.fullName || cvContent.cvGenerator.previewPlaceholders.name}
                </h2>
                <p className="text-xl text-gray-600">
                  {cvData.jobTitle || cvContent.cvGenerator.previewPlaceholders.jobTitle}
                </p>
              </div>

              <div>
                <h3 className={`text-xl font-bold mb-3 ${selectedTemplate?.color === 'blue' ? 'text-blue-600' : selectedTemplate?.color === 'emerald' ? 'text-emerald-600' : 'text-purple-600'}`}>
                  {cvContent.cvGenerator.skills}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {cvData.skills || cvContent.cvGenerator.previewPlaceholders.skills}
                  </p>
                </div>
              </div>

              <div>
                <h3 className={`text-xl font-bold mb-3 ${selectedTemplate?.color === 'blue' ? 'text-blue-600' : selectedTemplate?.color === 'emerald' ? 'text-emerald-600' : 'text-purple-600'}`}>
                  {cvContent.cvGenerator.experience}
                </h3>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {cvData.experience || cvContent.cvGenerator.previewPlaceholders.experience}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );

    // Progress Steps
    const renderProgressSteps = () => (
      <div className="flex justify-center mb-8">
        <div className="flex items-center space-x-4 space-x-reverse">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                cvStep >= step ? 'bg-emerald-500 text-white' : 'bg-gray-200 text-gray-500'
              }`}>
                {step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 rounded transition-all ${
                  cvStep > step ? 'bg-emerald-500' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
    );

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{cvContent.cvGenerator.smartTitle}</h1>
              <p className="text-xl text-gray-600">{cvContent.cvGenerator.smartSubtitle}</p>
            </div>

            {renderProgressSteps()}

            <div className="mb-8">
              {cvStep === 1 && renderTemplateSelection()}
              {cvStep === 2 && renderLanguageSelection()}
              {cvStep === 3 && renderCVForm()}
            </div>

            {/* Navigation & Generate Buttons */}
            <div className="flex justify-center space-x-4 space-x-reverse">
              {cvStep > 1 && (
                <button
                  onClick={() => setCvStep(cvStep - 1)}
                  className="px-8 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  {cvContent.cvGenerator.buttons.previous}
                </button>
              )}

              {cvStep === 3 && !generatedCVFile && (
                <button
                  onClick={handleCVGeneration}
                  disabled={isGeneratingCV}
                  className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-xl font-semibold hover:from-emerald-600 hover:to-blue-600 transition-all disabled:opacity-50 flex items-center space-x-2 space-x-reverse"
                >
                  {isGeneratingCV ? (
                    <>
                      <div className="spinner w-5 h-5"></div>
                      <span>{cvContent.cvGenerator.buttons.generating}</span>
                    </>
                  ) : (
                    <span>{cvContent.cvGenerator.buttons.generate}</span>
                  )}
                </button>
              )}

              {generatedCVFile && (
                <div className="space-x-4 space-x-reverse">
                  <button
                    onClick={downloadCV}
                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all animate-pulse-slow flex items-center space-x-2 space-x-reverse"
                  >
                    <span>📥</span>
                    <span>{cvContent.cvGenerator.buttons.download}</span>
                  </button>
                  <button
                    onClick={resetCVGenerator}
                    className="px-8 py-3 bg-gray-500 text-white rounded-xl font-semibold hover:bg-gray-600 transition-all"
                  >
                    {cvContent.cvGenerator.buttons.newCV}
                  </button>
                </div>
              )}
            </div>

            {generatedCVFile && (
              <div className="mt-8 text-center">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 max-w-md mx-auto">
                  <div className="text-4xl mb-2">✅</div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">{cvContent.cvGenerator.success.title}</h3>
                  <p className="text-green-600">{cvContent.cvGenerator.success.subtitle}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderInterviewTrainer = () => (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t.interviewTrainer.title}</h1>
            <p className="text-xl text-gray-600">{t.interviewTrainer.subtitle}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="text-center mb-8">
              <div className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">🤖</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">مُحاكي مقابلة العمل</h3>
              <p className="text-lg text-gray-600 mb-6">{t.interviewTrainer.question}</p>
              
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all">
                {t.interviewTrainer.recordBtn} 🎤
              </button>
            </div>
          </div>
          
          {/* Mock Feedback */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-purple-600 mb-6">{t.interviewTrainer.feedbackTitle}</h3>
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-semibold text-green-700 mb-2">التقييم: 85/100</h4>
                <p className="text-green-600">إجابة جيدة! يمكنك تحسين الثقة في الصوت وإضافة المزيد من الأمثلة العملية.</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-700 mb-2">اقتراحات للتحسين:</h4>
                <ul className="list-disc list-inside text-blue-600 space-y-1">
                  <li>استخدم أمثلة محددة من خبرتك</li>
                  <li>تحدث بثقة أكبر</li>
                  <li>اربط إجابتك بمتطلبات الوظيفة</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderJobVerifier = () => (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">{t.jobVerifier.title}</h1>
            <p className="text-xl text-gray-600">{t.jobVerifier.subtitle}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <form onSubmit={(e) => {
              e.preventDefault();
              setJobVerifierResult({
                is_compliant: true,
                compliance_level: 'متوافق بالكامل',
                explanation: 'هذا العرض الوظيفي متوافق مع أحكام الشريعة الإسلامية. لا يحتوي على أنشطة محرمة مثل الربا أو بيع المحرمات.',
                recommendations: [
                  'تأكد من مواعيد الصلاة في بيئة العمل',
                  'اسأل عن السياسات المتعلقة بالإجازات الدينية'
                ]
              });
            }}>
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  {t.jobVerifier.jobOfferLabel}
                </label>
                <textarea 
                  className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none resize-none h-40"
                  placeholder="الصق نص العرض الوظيفي هنا..."
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-700 mb-3">
                  أو ارفع ملف (اختياري)
                </label>
                <input 
                  type="file" 
                  accept=".txt,.pdf"
                  className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-orange-500 focus:outline-none"
                />
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-xl text-lg font-semibold hover:from-orange-600 hover:to-red-600 transition-all"
              >
                {t.jobVerifier.submitBtn}
              </button>
            </form>
          </div>
          
          {/* Results */}
          {jobVerifierResult && (
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-6">
                <div className={`inline-flex items-center px-6 py-3 rounded-full text-lg font-semibold ${
                  jobVerifierResult.is_compliant 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {jobVerifierResult.is_compliant ? t.jobVerifier.compliant : t.jobVerifier.nonCompliant}
                </div>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">التفسير:</h4>
                  <p className="text-gray-600 leading-relaxed">{jobVerifierResult.explanation}</p>
                </div>
                
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">التوصيات:</h4>
                  <ul className="list-disc list-inside text-gray-600 space-y-2">
                    {jobVerifierResult.recommendations.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderAboutPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-emerald-50 to-white py-12">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full mx-auto mb-8 flex items-center justify-center shadow-lg">
              <span className="text-4xl font-bold text-white">W</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {t.about.description}
            </p>
          </div>
          
          {/* Mission Section */}
          <div className="mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-10 shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mr-6 ml-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{t.about.mission}</h2>
              </div>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                {t.about.missionText}
              </p>
            </div>
          </div>
          
          {/* Innovation & Impact Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-2xl flex items-center justify-center mr-4 ml-4">
                  <span className="text-3xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{t.about.innovation}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t.about.innovationText}
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-3xl p-8 shadow-xl border border-white/20">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mr-4 ml-4">
                  <span className="text-3xl">💫</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800">{t.about.impact}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {t.about.impactText}
              </p>
            </div>
          </div>

          {/* Team Section Placeholder */}
          <div className="bg-gradient-to-r from-blue-500 to-emerald-500 rounded-3xl p-10 text-center text-white">
            <h3 className="text-3xl font-bold mb-6">Our Team</h3>
            <p className="text-xl mb-8 opacity-90">
              A passionate team of developers, designers, and cultural experts working to empower Arabic youth
            </p>
            <div className="grid md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((member) => (
                <div key={member} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h4 className="font-semibold mb-2">Team Member {member}</h4>
                  <p className="text-sm opacity-80">Role & Expertise</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch(currentPage) {
      case 'home': return renderHomePage();
      case 'careerDiscovery': return renderCareerDiscovery();
      case 'cvGenerator': return renderCVGenerator();
      case 'interviewTrainer': return renderInterviewTrainer();
      case 'jobVerifier': return renderJobVerifier();
      case 'about': return renderAboutPage();
      default: return renderHomePage();
    }
  };

  return (
    <div className={`min-h-screen ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <span className="text-xl font-bold text-white">W</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text text-transparent">
                {language === 'arabic' ? 'واصلة' : 'Wasila'}
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-6 space-x-reverse">
              {Object.entries(t.nav).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => setCurrentPage(key)}
                  className={`px-4 py-2 rounded-xl font-medium transition-all ${
                    currentPage === key 
                      ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white shadow-lg' 
                      : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
            
            <button 
              onClick={toggleLanguage}
              className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white px-6 py-2 rounded-xl font-medium hover:from-blue-600 hover:to-emerald-600 transition-all shadow-lg"
            >
              {language === 'arabic' ? 'EN' : 'عر'}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      {renderCurrentPage()}

      {/* Floating Chat Icon */}
      <div className="fixed bottom-6 right-6 z-50">
        <button className="bg-gradient-to-r from-blue-500 to-emerald-500 text-white w-16 h-16 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all flex items-center justify-center backdrop-blur-sm">
          <span className="text-2xl">💬</span>
        </button>
      </div>
    </div>
  );
}

export default App;