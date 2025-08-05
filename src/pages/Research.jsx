import React, { useState, useEffect } from "react";
import {
  FiGithub,
  FiExternalLink,
  FiCode,
  FiCpu,
  FiGlobe,
  FiLayers,
  FiZap,
} from "react-icons/fi";

const Research = () => {
  const [researchData, setResearchData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    // Load research data
    import("../data/research.json")
      .then((data) => {
        setResearchData(data.default);
      })
      .catch((error) => {
        console.error("Error loading research data:", error);
      });
  }, []);

  const categories = [
    "All",
    ...new Set(researchData.map((item) => item.category)),
  ];

  const filteredResearch =
    selectedCategory === "All"
      ? researchData
      : researchData.filter((item) => item.category === selectedCategory);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-success";
      case "experimental":
        return "text-warning";
      case "complete":
        return "text-info";
      default:
        return "text-base-content/60";
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "Computer Architecture":
        return <FiCpu className="w-5 h-5" />;
      case "Networking":
        return <FiGlobe className="w-5 h-5" />;
      case "Embedded Systems":
        return <FiZap className="w-5 h-5" />;
      default:
        return <FiCode className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Research & Experiments
          </h1>
          <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
            Exploring computer systems, networking protocols, and emerging
            technologies through hands-on research projects and experimental
            implementations.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-primary text-primary-content shadow-lg"
                  : "bg-base-200 text-base-content hover:bg-base-300"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredResearch.map((research) => (
            <div
              key={research.id}
              className="card bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-300 group hover:scale-[1.02]"
            >
              <div className="card-body">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2 text-primary">
                    {getCategoryIcon(research.category)}
                    <span className="text-sm font-medium">
                      {research.category}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-2 h-2 rounded-full ${getStatusColor(
                        research.status
                      ).replace("text-", "bg-")}`}
                    ></div>
                    <span
                      className={`text-sm font-medium capitalize ${getStatusColor(
                        research.status
                      )}`}
                    >
                      {research.status}
                    </span>
                  </div>
                </div>

                <h3 className="card-title text-2xl mb-3 group-hover:text-primary transition-colors">
                  {research.name}
                </h3>

                <p className="text-base-content/80 mb-4 leading-relaxed">
                  {research.description}
                </p>

                <p className="text-base-content/60 text-sm mb-6 leading-relaxed">
                  {research.longDescription}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {research.techTags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="badge badge-outline badge-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center justify-between">
                  <div className="flex space-x-4">
                    {research.repoUrl && (
                      <a
                        href={research.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                      >
                        <FiGithub className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    )}
                    {research.liveUrl && (
                      <a
                        href={research.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-outline btn-sm"
                      >
                        <FiExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    )}
                  </div>
                  <span className="text-base-content/60 text-sm">
                    {research.year}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Research Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="stat bg-base-200 rounded-box text-center">
            <div className="stat-value text-primary">{researchData.length}</div>
            <div className="stat-title">Research Projects</div>
          </div>
          <div className="stat bg-base-200 rounded-box text-center">
            <div className="stat-value text-success">
              {researchData.filter((r) => r.status === "active").length}
            </div>
            <div className="stat-title">Active Research</div>
          </div>
          <div className="stat bg-base-200 rounded-box text-center">
            <div className="stat-value text-secondary">
              {categories.length - 1}
            </div>
            <div className="stat-title">Research Areas</div>
          </div>
        </div>

        {/* Research Philosophy */}
        <div className="mt-20 text-center">
          <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
              <div className="flex justify-center mb-6">
                <FiLayers className="w-16 h-16 text-primary" />
              </div>
              <h2 className="card-title text-3xl mb-6 justify-center">
                Research Philosophy
              </h2>
              <p className="text-xl text-base-content/80 max-w-4xl mx-auto leading-relaxed">
                "True understanding comes from building systems from the ground
                up. Each research project is an exploration into the fundamental
                principles that make computing possible, from low-level hardware
                emulation to high-level network protocols."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Research;
