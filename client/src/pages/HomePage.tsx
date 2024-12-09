import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-center flex flex-col">
      <header className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <h1 className="text-6xl font-bold">Cupid</h1>
        <nav className="mt-8">
          <Link
            to="/login"
            className="text-lg px-6 py-2 bg-white text-purple-600 rounded-lg shadow-md hover:bg-purple-200 mx-2"
          >
            Logowanie
          </Link>
          <Link
            to="/login"
            className="text-lg px-6 py-2 bg-white text-pink-600 rounded-lg shadow-md hover:bg-pink-200 mx-2"
          >
            Rejestracja
          </Link>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="py-20 px-4">
          <h2 className="text-4xl font-semibold text-gray-800">
            Co oferujemy?
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptates
            est delectus dolorem officiis numquam excepturi at ullam sit minima
            iusto. Quibusdam quae dignissimos temporibus consectetur autem non
            neque saepe fuga! Amet repellat accusantium, vel maiores aperiam
            praesentium iusto ad id aspernatur quaerat eaque? Quia, maxime!
            Assumenda non quam recusandae, vero possimus expedita, ratione quas
            rerum aspernatur officiis blanditiis provident fugit!
          </p>
        </section>

        <section className="py-20 px-4 bg-gray-100">
          <h2 className="text-4xl font-semibold text-gray-800">Regulamin</h2>
          <p className="mt-4 text-lg text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates
            maxime minima harum incidunt quasi mollitia accusantium nulla
            doloribus, repellat, sapiente repellendus enim dignissimos
            consequatur debitis delectus. Sint voluptatem quasi temporibus!
            Cupiditate quis, nam pariatur hic nulla fugit rem aut fuga
            consequatur, necessitatibus eveniet eaque totam, reiciendis non! Ab
            sapiente, fuga iusto iure, quae omnis id quam repudiandae explicabo
            maxime quaerat. Aliquam reiciendis corporis error neque, doloremque
            nisi amet voluptas, minima recusandae eaque itaque sed rerum atque.
            Cumque facilis maxime asperiores laudantium suscipit rerum tempora!
            Sunt unde corporis nam omnis quidem? Delectus consequatur beatae,
            fugit impedit reiciendis numquam accusantium dolorum omnis vitae
            saepe possimus tempore dolores quia tempora exercitationem eligendi
            nemo natus nisi! Soluta vitae quo voluptas a ipsam perferendis non!
            Eveniet nesciunt fugit vitae? Quisquam, magni fugit reprehenderit
            adipisci quia aperiam ad. Itaque ut est unde. Nostrum eius nobis
            minus inventore dolorum rerum reiciendis animi sed aut ullam.
            Corrupti, nisi!
          </p>
        </section>
      </main>

      <footer className="py-4 bg-gray-800 text-white">
        <p>&copy; 2024 Cupid. Wszelkie prawa zastrzeżone.</p>
      </footer>
    </div>
  );
}

export default HomePage;
