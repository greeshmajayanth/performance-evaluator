import React, { Component } from 'react';
import { withRouter } from '../../withRouter.js'
import HomePage from '../home/home.js';
import AboutUs from '../aboutUs/aboutUs.js';
import Services from '../servicePage/service.js';
import CourseComponent from '../courses/courses.js';
import ContactComponent from '../contactUs/contactUs.js';
import StudentProfile from '../student/student.js';
import AdminProfile from '../admin/admin.js';
import Instructor from '../instructor/instructor.js';
import ProgramCoordinator from '../programCoordinator/programCoordinator.js';
import QAProfile from '../QA/QAOfficer.js';
import '../../dashboard.css'; // Import your CSS file

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showMainPage: true,
          showHome: false,
          showAbout: false,
          showService: false,
          showCourses: false,
          showContact: false,
          showProfile: false
        };

        this.onLogout = this.onLogout.bind(this)
    }

    clickHome = () => {
        this.setState(prevState => ({
            showMainPage: false,
            showHome: true,
            showAbout: false,
            showService: false,
            showCourses: false,
            showContact: false,
            showProfile: false
        }));
    };
    
    clickAbout = () => {
        this.setState(prevState => ({
            showMainPage: false,
            showHome: false,
            showAbout: true,
            showService: false,
            showCourses: false,
            showContact: false,
            showProfile: false
        }));
    };

    clickService = () => {
        this.setState(prevState => ({
            showMainPage: false,
            showHome: false,
            showAbout: false,
            showService: true,
            showCourses: false,
            showContact: false,
            showProfile: false
        }));
    };

    clickCourses = () => {
        this.setState(prevState => ({
            showMainPage: false,
            showHome: false,
            showAbout: false,
            showService: false,
            showCourses: true,
            showContact: false,
            showProfile: false
        }));
    };

    clickContact = () => {
        this.setState(prevState => ({
            showMainPage: false,
            showHome: false,
            showAbout: false,
            showService: false,
            showCourses: false,
            showContact: true,
            showProfile: false
        }));
    };

    clickProfile = () => {
        this.setState(prevState => ({
            showMainPage: false,
            showHome: false,
            showAbout: false,
            showService: false,
            showCourses: false,
            showContact: false,
            showProfile: true
        }));
    };

    handleLiClick = () => {
        // Redirect the user to a different website
        window.location.href = 'http://axb4369.uta.cloud/';
    };

    onLogout() {
        const { navigate } = this.props;
        // Navigate to Another Component
        navigate("/");
    }

  render() {

    const { showMainPage, showHome, showAbout, showService, showCourses, showContact, showProfile } = this.state;
    const searchParams = new URLSearchParams(window.location.search);
    const userRole = searchParams.get('userRole');
    return (
        <div className="dashboard">
                <nav className="sidebar">
                <ul>
                    <li onClick={this.clickHome}>Home</li>
                    <li onClick={this.clickAbout}>About Us</li>
                    <li onClick={this.clickService}>Services</li>
                    <li onClick={this.clickCourses}>Courses</li>
                    <li onClick={this.clickContact}>Contact Us</li>
                    <li onClick={this.handleLiClick}>Blog</li>
                    <li onClick={this.clickProfile}>Profile</li>
                    <li></li><li></li><li></li>
                    <li onClick={this.onLogout}>Log out</li>
                </ul>
                </nav>
                <div className="content">
                    {showMainPage && (
            
                        <div id="default" className="page" style={{ display: 'block' }}>
                            <div className="content-box">
                                <h1 className="welcome-text">Welcome to Computer Science Performance of MSC</h1>
                            </div>
                        </div>
                    
                    )}

                    {showHome && <HomePage /> }

                    {showAbout && <AboutUs />}

                    {showService && <Services />}

                    {showCourses && <CourseComponent />}

                    {showContact && <ContactComponent />}
                    
                    {showProfile && userRole === 'Student' && <StudentProfile />}
                    {showProfile && userRole === 'Admin' && <AdminProfile />}
                    {showProfile && userRole === 'ProgramCO' && <ProgramCoordinator />}
                    {showProfile && userRole === 'Instructor' && <Instructor />}
                    {showProfile && userRole === 'QAofficer' && <QAProfile />}

                
        
            </div>
        </div>
  
    );
  }
}

export default withRouter(Dashboard);
