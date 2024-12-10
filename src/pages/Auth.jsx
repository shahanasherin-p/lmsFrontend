import CommonForm from '@/components/common-form/Index'
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { signInFormControls, signUpFormControls } from '@/config'
import { AuthContext } from '@/context/AuthContext'
import { BookOpenIcon,HomeIcon } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'

const Auth = () => {
    const [activeTab, setActiveTab] = useState('signin')
    const { signInFormData, setSignInFormData, signUpFormData, setSignUpFormData, handleRegisterUser, handleLoginUser } = useContext(AuthContext)

    const handleTabChange = (value) => {
        setActiveTab(value)
    }

    const checkIfSignInFormIsValid = () => {
        return (
            signInFormData &&
            signInFormData.userEmail !== "" &&
            signInFormData.password !== ""
        );
    }

    const checkIfSignUpFormIsValid = () => {
        return (
            signUpFormData &&
            signUpFormData.userName !== "" &&
            signUpFormData.userEmail !== "" &&
            signUpFormData.password !== ""
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">
                        <Link 
                to="/" 
                className="absolute top-4 left-4 flex items-center text-indigo-600 hover:text-indigo-800 transition-colors"
            >
                <HomeIcon className="mr-2 w-6 h-6" />
                <span className="font-medium">Home</span>
            </Link>
            <div className="w-full max-w-4xl flex shadow-2xl rounded-3xl overflow-hidden">
                {/* Left Side - Illustration */}
                <div className="hidden md:block w-1/2 bg-gradient-to-br from-indigo-500 to-purple-600 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-700 opacity-80"></div>
                    <div className="relative z-10 p-12 text-white h-full flex flex-col justify-center">
                        <BookOpenIcon className="w-24 h-24 mb-6 text-white/90" />
                        <h2 className="text-4xl font-bold mb-4">Welcome to BrightLearn</h2>
                        <p className="text-xl text-white/80">
                            Unlock your potential with our comprehensive online learning platform. 
                            Explore, learn, and grow with expert-led courses.
                        </p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/30 to-transparent"></div>
                </div>

                {/* Right Side - Authentication Form */}
                <div className="w-full md:w-1/2 bg-white">
                    <Tabs
                        value={activeTab}
                        defaultValue="signin"
                        onValueChange={handleTabChange}
                        className="w-full"
                    >
                        <TabsList className="grid grid-cols-2 bg-gray-100 p-1 rounded-none">
                            <TabsTrigger 
                                value='signin' 
                                className={`py-1 text-lg font-semibold transition-all duration-300 ${
                                    activeTab === 'signin' 
                                        ? 'bg-white text-indigo-600 shadow-md' 
                                        : 'text-gray-500 hover:text-indigo-500'
                                }`}
                            >
                                Sign In
                            </TabsTrigger>
                            <TabsTrigger 
                                value='signup' 
                                className={`py-1 text-lg font-semibold transition-all duration-300 ${
                                    activeTab === 'signup' 
                                        ? 'bg-white text-indigo-600 shadow-md' 
                                        : 'text-gray-500 hover:text-indigo-500'
                                }`}
                            >
                                Sign Up
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value='signin' className="p-8 space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h2>
                                <p className="text-gray-500">Sign in to continue your learning journey</p>
                            </div>
                            <CommonForm
                                formControls={signInFormControls}
                                buttonText={"Sign In"}
                                formData={signInFormData}
                                setFormData={setSignInFormData}
                                isButtonDisabled={!checkIfSignInFormIsValid()}
                                handleSubmit={handleLoginUser}
                                className="space-y-4"
                                buttonClassName="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors"
                            />
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Don't have an account? {' '}
                                    <button 
                                        onClick={() => setActiveTab('signup')} 
                                        className="text-indigo-600 hover:underline"
                                    >
                                        Sign Up
                                    </button>
                                </p>
                            </div>
                        </TabsContent>

                        <TabsContent value='signup' className="p-8 space-y-6">
                            <div className="text-center">
                                <h2 className="text-3xl font-bold text-gray-800 mb-2">Create Account</h2>
                                <p className="text-gray-500">Start your learning adventure today</p>
                            </div>
                            <CommonForm
                                formControls={signUpFormControls}
                                buttonText={"Sign Up"}
                                formData={signUpFormData}
                                setFormData={setSignUpFormData}
                                isButtonDisabled={!checkIfSignUpFormIsValid()}
                                handleSubmit={handleRegisterUser}
                                className="space-y-4"
                                buttonClassName="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg transition-colors"
                            />
                            <div className="text-center">
                                <p className="text-gray-600">
                                    Already have an account? {' '}
                                    <button 
                                        onClick={() => setActiveTab('signin')} 
                                        className="text-indigo-600 hover:underline"
                                    >
                                        Sign In
                                    </button>
                                </p>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default Auth;