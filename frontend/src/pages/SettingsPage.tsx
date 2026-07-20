import Sidebar from "../components/Sidebar.tsx";
import {useEffect, useState} from "react";
import {getNotificationSettings, toggleNotificationSettings} from "../api/notifications.ts";
import {Settings} from "lucide-react";

export default function SettingsPage() {
    const [notificationsEnabled, setNotificationsEnabled] = useState(false);
    const [loading, setLoading] = useState(true);
    const [toggling, setToggling] = useState(false);

    useEffect(() => {
        getNotificationSettings()
            .then((data) => setNotificationsEnabled(data.notificationsEnabled))
            .catch((e) => console.error("Failed to fetch notification settings:", e))
            .finally(() => setLoading(false));
    }, []);

    const handleToggle = async () => {
        if (toggling) return;
        setToggling(true);
        try {
            const data = await toggleNotificationSettings();
            setNotificationsEnabled(data.notificationsEnabled);
        } catch (e) {
            console.error("Failed to toggle notification settings:", e);
        } finally {
            setToggling(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#141414] flex">
            <Sidebar />

            <main className="flex-1 ml-60 flex justify-center">
                <div className="w-full max-w-2xl min-h-screen pb-24">
                    <header className="sticky px-6 pt-10 pb-6">
                        <h1 className="text-2xl font-bold text-white/90">Settings</h1>
                    </header>

                    {loading ? (
                        <div className="flex justify-center items-center py-20">
                            <span className="loading loading-spinner loading-md text-[#8A9A5B]" />
                        </div>
                    ) : (
                        <div className="px-6">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
                                <div className="flex items-center gap-3">
                                    <Settings size={20} className="text-white/50" />
                                    <div>
                                        <p className="text-sm text-white/90 font-medium">Email Notifications</p>
                                        <p className="text-xs text-white/40">Receive email reminders about upcoming events</p>
                                    </div>
                                </div>
                                <input
                                    type="checkbox"
                                    className="toggle toggle-success border-transparent bg-white/10 checked:bg-[#8A9A5B]"
                                    checked={notificationsEnabled}
                                    onChange={handleToggle}
                                    disabled={toggling}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
