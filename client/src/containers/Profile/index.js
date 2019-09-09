import React from "react";
import "./style.css";

const Profile = props => (

    <div id="page">
        <div id="profile" className="pageProfile">
            <div className="page-header clearfix">
                <span>My Profile</span>
                <ul>
                </ul>
            </div>
            <div className="profile-body scroll-hijack">
                <div className="row">
                    {/* <div className="col-lg-8 col-lg-offset-2"> */}
                        <div className="row valign">
                            <div className="col-md-6">
                                <h6 className="text-bold mb-25">Friends List</h6>
                                <div className="groups-list scroll-hijack">
                                    <ul className="list">
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Binyan</a></li>
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Coral</a></li>
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Musa</a></li>
                                    </ul>
                                </div>
                                <h6 className="text-bold mt-25">Public Channels</h6>
                                <p className="mb-25 clr-fade text-small">Click a group to copy the invite link to clipboard</p>
                                <div className="groups-list scroll-hijack">
                                    <ul className="list">
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Stranger Things</a></li>
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Spiderman</a></li>
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Parks and Rec</a></li>
                                    </ul>
                                </div>
                                <h6 className="text-bold mt-25">Private Channels</h6>
                                <p className="mb-25 clr-fade text-small">Click a group to copy the invite link to clipboard</p>
                                <div className="groups-list scroll-hijack">
                                    <ul className="list">
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Stranger Things W/ Spoils</a></li>
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>My Hero Academia W/ Spoils</a></li>
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Demon Slayer W/ Spoils</a></li>
                                    </ul>
                                </div>
                                <h6 className="text-bold mt-25">Recent Ratings</h6>
                                <div className="groups-list scroll-hijack">
                                    <ul className="list">
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Demon Slayer&nbsp;S.1 E.3&nbsp;Rating: 5</a></li>
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Stranger Things&nbsp;S.1E.8 &nbsp;Rating: 5</a></li>
                                        <li><a href="/profile"><div className="avatar"><img className="little_avatar" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" alt="" /></div>Game of Thrones&nbsp;Rating: 1</a></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="mt-25 visible-xs visible-sm"></div>
                                <h6 className="text-bold">Profile Settings</h6>
                                <form className="form-horizontal" action="/users/@me/update?_method=PATCH" method="POST">
                                    <div className="form-group">
                                        <p className="label mb-10">Choose a new profile image</p>
                                        <label for="profile_photo" className="profile-photo-placeholder avatar-placeholder" data-toggle="tooltip" data-title="Upload a new profile image" data-placement="bottom"><img id="profile_photo_img" src="https://cdn1.iconfinder.com/data/icons/ninja-things-1/1772/ninja-simple-512.png" width="85%" height="85%" alt="" /></label>
                                    </div>
                                    <div className="form-group">
                                        <label for="profile_email">Email</label>
                                        <input type="email" name="user[email]" disabled id="profile_email" className="form-control" value="locked" />
                                    </div>
                                    <div className="form-group">
                                        <label for="profile_username">Username</label>
                                        <input type="text" name="user[username]" id="profile_username" className="form-control" value="birnapwnsu" />
                                    </div>
                                    <div className="form-group">
                                        <label for="profile_password">Password</label>
                                        <input type="password" name="profile_password" disabled id="profile_password" className="form-control" value="password" />
                                    </div>
                                    <div className="form-group">
                                        {/* <button type="submit" className="btn btn-primary btn-radius">Save Changes</button> */}
                                    </div>
                                </form>
                            {/* </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Profile; 