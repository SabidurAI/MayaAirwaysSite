import Link from 'next/link';

export default function Header({ name }) {
  return (
    <div>
      <header className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white">
        <div align="center">
          <img alt="maya" src="https://github.com/SabidurAI/MayaAirwaysSite/assets/36314124/4912eac3-25f2-47d6-b6f7-db4e1ab68bbc" height="50" width="50" />
        </div>
        <div>
          <h1 className="text-xl font-bold">{name}</h1>
        </div>
        <nav className="space-x-4">
          <Link href="/" legacyBehavior>
            <a className="text-white hover:text-gray-300">Home</a>
          </Link>
          <Link href="/posts/About-Us" legacyBehavior>
            <a className="text-white hover:text-gray-300">Conocenos</a>
          </Link>
          <Link href="/posts/Nuestras-Bicicletas" legacyBehavior>
            <a className="text-white hover:text-gray-300">Nuestras Bicicletas</a>
          </Link>
          {/* Add more navigation links as needed */}
        </nav>
      </header>
    </div>
  );
}
