import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { ArrowLeft, BookOpen } from 'lucide-react';

export default function Welcome() {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const course = location.state?.course;

    if (!course) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Not Found</h2>
                <p className="text-gray-600 mb-8">It seems you have arrived here without selecting a course.</p>
                <button
                    onClick={() => navigate('/enrollments')}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    Return to Enrollments
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
                onClick={() => navigate('/enrollments')}
                className="flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors"
            >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Enrollments
            </button>

            <div className="bg-white border-2 border-gray-200 rounded-2xl p-8 sm:p-12 shadow-sm text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-8">
                    <BookOpen className="h-10 w-10 text-blue-600" />
                </div>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                    Hello {user?.name || 'Student'},
                </h1>

                <h2 className="text-2xl font-medium text-gray-700 mb-4">
                    Welcome to <span className="text-blue-600 font-bold">{course.title}</span>
                </h2>

                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
                    {course.description || "Get ready to start your learning journey!"}
                </p>

                <div className="mt-12">
                    <button className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg">
                        Start Learning
                    </button>
                </div>
            </div>
        </div>
    );
}
