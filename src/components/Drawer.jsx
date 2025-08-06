import { Link } from "react-router-dom";

export function Drawer() {
  const closeDrawer = () => {
    const drawerInput = document.getElementById("drawer-input");
    if (drawerInput) {
      drawerInput.checked = false;
    }
  };

  return (
    <div className="drawer-side pt-[64px]">
      <label
        htmlFor="drawer-input"
        aria-label="close sidebar"
        className="drawer-overlay"
      ></label>
      <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <li>
          <Link to="/" onClick={closeDrawer} className="text-md">
            Home
          </Link>
        </li>
        <li>
          <Link to="/about" onClick={closeDrawer} className="text-md">
            About
          </Link>
        </li>
        <li>
          <Link to="/projects" onClick={closeDrawer} className="text-md">
            Projects
          </Link>
        </li>
        <li>
          <Link to="/research" onClick={closeDrawer} className="text-md">
            Research
          </Link>
        </li>
        <li>
          <Link to="/blog" onClick={closeDrawer} className="text-md">
            Blog
          </Link>
        </li>
        <li>
          <Link to="/resume" onClick={closeDrawer} className="text-md">
            Resume
          </Link>
        </li>
        <li>
          <Link to="/contact" onClick={closeDrawer} className="text-md">
            Contact
          </Link>
        </li>
        <div className="divider"></div>
        <li>
          <a
            href="https://github.com/ahmetcanaksu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md"
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/ahmetcanaksu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md"
          >
            LinkedIn
          </a>
        </li>
        <li>
          <a
            href="https://twitter.com/ahmetcanaksu"
            target="_blank"
            rel="noopener noreferrer"
            className="text-md"
          >
            Twitter
          </a>
        </li>
      </ul>
    </div>
  );
}
