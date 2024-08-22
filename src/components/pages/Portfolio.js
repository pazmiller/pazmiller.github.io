import React, {useState} from "react";
import cisco from "../../assets/images/cisco.png";
import gsf from "../../assets/images/gsf.png";
import rhul from "../../assets/images/rhul.png";

function Portfolio() {
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        {
            title: "Project 1",
            company: "Company 1",
            description: "Description 1",
            duration: "Duration 1",
            image: cisco,
        },
        {
            title: "Project 2",
            company: "Company 2",
            description: "Description 2",
            duration: "Duration 2",
            image: gsf
        },
        {
            title: "Project 3",
            company: "Company 3",
            description: "Description 3",
            duration: "Duration 3",
            image: rhul
        },
        {
            title: "Project 4",
            company: "Company 4",
            description: "Description 4",
            duration: "Duration 4"
        }
    ]

    const openModal = (project) => {
        setSelectedProject(project);
    }

    const closeModal = () => {
        setSelectedProject(null);
    }
    return (
        <section id="portfolio" className="portfolio-section bg-gray-100 py-20">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold mb-10 text-center">My Work</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project, index) => (
                        <div key={index}
                             className="portfolio-card bg-white shadow-md rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                            <img src={project.image} alt={project.title} className="w-50 h-30 object-cover mx-auto"/>
                            <div className="p-4">
                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <button
                                    onClick={() => openModal(project)}
                                    className="text-blue-500 hover:underline"
                                >
                                    View Experience Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            {selectedProject && (
                <div
                    className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg w-1/2">
                        <h2 className="text-2xl font-bold mb-4">{selectedProject.title}</h2>
                        <p className="text-gray-600 mb-4">{selectedProject.description}</p>
                        <p className="text-gray-600 mb-4">{selectedProject.duration}</p>
                        <button
                            onClick={closeModal}
                            className="text-blue-500 hover:underline"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </section>
    );
}

export default Portfolio;