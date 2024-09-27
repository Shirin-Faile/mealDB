import { useUserContext } from "@/context/UserContext";

const ProfileSummary = () => {
    const { user } = useUserContext();

    if (!user) {
        return <p>Please log in to see your profile.</p>;
    }

    return (
        <div className="p-4 border border-gray-300 rounded">
            <h2 className="text-xl">Welcome, {user.name}!</h2>
            <h3 className="mt-4">Your Saved Items:</h3>
            {user.savedItems.length > 0 ? (
                <ul className="list-disc ml-5">
                    {user.savedItems.map((item) => (
                        <li key={item.id}>{item.name}</li>
                    ))}
                </ul>
      ) : (
        <p>You have no saved items.</p>
      )}
    </div>
  );
};

export default ProfileSummary;