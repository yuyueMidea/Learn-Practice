export default function Home() {
    return (
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Home Page</h2>
        <p className="text-gray-700">
          Welcome to the home page of our application.
        </p>
        <div className="border p-4">div1</div>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-gray-200 p-4">项目1</div>
          <div class="bg-gray-200 p-4">项目2</div>
          <div class="bg-gray-200 p-4">项目3</div>
          <div class="bg-gray-200 p-4">项目4</div>
          <div class="bg-gray-200 p-4">项目5</div>
          <div class="bg-gray-200 p-4">项目6</div>
        </div>
      </div>
    )
  }