import { useUserContext } from "@/context/UserContext";
import LoginForm from "@/components/LoginForm";
import ProfileSummary from "@/components/ProfileSummary";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Home() {
    const { user } = useUserContext();
  
    return (
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Header />
        <main className="flex-grow flex items-center justify-center p-4">
          {user ? <ProfileSummary /> : <LoginForm />}
        </main>
        <Footer />
      </div>
    );
  }
