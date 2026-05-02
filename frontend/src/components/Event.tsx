interface Props {
    id: number,
    title: string,
    description: string
}

export default function Event(event: Props) {


    return (
        <div className="min-h-screen bg-base-200 flex justify-center py-10 px-4">

            <div className="w-full max-w-2xl flex flex-col gap-4">
                <div
                    key={event.id}
                    className="bg-base-100 shadow-md rounded-xl p-4 flex flex-col gap-3"
                >

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-base-content">
                        {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-base-content/70">
                        {event.description}
                    </p>

                    {/* Action */}
                    <div className="flex justify-end">
                        <button className="btn bg-green-700 text-white hover:bg-green-600">
                            Join
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}
