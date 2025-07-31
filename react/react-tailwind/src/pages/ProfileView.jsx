import { Edit3, Mail, MapPin, Phone, Save, User, X } from "lucide-react";
import { useState } from "react";
import useUserStore from "../store/userStore";
import useAuthStore from "../store/authStore";

export default function ProfileView () {
  const {userProfile, setUserProfile} = useUserStore();
  const {darkMode} = useAuthStore
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(userProfile);
  // 保存个人资料
  const handleSaveProfile = () => {
    setUserProfile(editForm);
    setIsEditing(false);
  };

    return (
        <div className="p-6 max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>个人资料</h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`flex items-center px-4 py-2 rounded-lg ${
                isEditing 
                  ? 'bg-red-600 hover:bg-red-700 text-white' 
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit3 className="w-4 h-4 mr-2" />}
              {isEditing ? '取消编辑' : '编辑资料'}
            </button>
          </div>
          
          <div className={`rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="p-6">
              <div className="flex items-center space-x-6 mb-6">
                <div className={`w-24 h-24 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-600' : 'bg-blue-500'}`}>
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                      className={`text-2xl font-bold mb-2 px-3 py-1 rounded border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                      }`}
                    />
                  ) : (
                    <h3 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile.name}</h3>
                  )}
                  {isEditing ? (
                    <textarea
                      value={editForm.bio}
                      onChange={(e) => setEditForm({...editForm, bio: e.target.value})}
                      className={`w-full px-3 py-1 rounded border ${
                        darkMode ? 'bg-gray-700 border-gray-600 text-gray-400' : 'bg-white border-gray-300 text-gray-600'
                      }`}
                      rows="2"
                    />
                  ) : (
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{userProfile.bio}</p>
                  )}
                  <p className={`text-sm mt-2 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>加入时间：{userProfile.joinDate}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { icon: Mail, label: '邮箱', field: 'email' },
                  { icon: Phone, label: '电话', field: 'phone' },
                  { icon: MapPin, label: '地址', field: 'location' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <item.icon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{item.label}</p>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editForm[item.field]}
                          onChange={(e) => setEditForm({...editForm, [item.field]: e.target.value})}
                          className={`w-full px-2 py-1 rounded border ${
                            darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'
                          }`}
                        />
                      ) : (
                        <p className={`${darkMode ? 'text-white' : 'text-gray-900'}`}>{userProfile[item.field]}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              {isEditing && (
                <div className="flex space-x-3 mt-6">
                  <button
                    onClick={handleSaveProfile}
                    className="flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    保存更改
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      );
}