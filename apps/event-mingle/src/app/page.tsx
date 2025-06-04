export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to EventMingle
        </h1>
        <p className="text-xl text-gray-600">
          Discover and connect through amazing events
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Event Discovery Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Discover Events</h2>
          <p className="text-gray-600">
            Swipe through events and find your perfect match
          </p>
        </section>

        {/* Chat System Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Connect & Chat</h2>
          <p className="text-gray-600">
            Chat with event participants and organizers
          </p>
        </section>

        {/* Event Management Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Manage Events</h2>
          <p className="text-gray-600">
            Create and manage your own events
          </p>
        </section>
      </div>
    </div>
  );
}
