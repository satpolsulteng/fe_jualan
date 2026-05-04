import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    ReactNode,
    FC,
} from "react";

// Define the shape of the AuthContext
interface AuthContextType {
    token: string | null;
    setToken: (newToken: string | null) => void;
    username: string | null;
    setUsername: (newUsername: string | null) => void;
    role: string | null;
    setRole: (newUsername: string | null) => void;
    user_id: string | null;
    setUserId: (newUserId: string | null) => void;
    name: string | null;
    setName: (newName: string | null) => void;
    imgUrl: string | null;
    setImgUrl: (newImgUrl: string | null) => void;
    position: string | null;
    setPosition: (newPosition: string | null) => void;
    tim: string | null;
    setTim: (newTim: string | null) => void;
    level: string | null;
    setLevel: (newRole: string | null) => void;
    schoolOrigin: string | null;
    setSchoolOrigin: (newSchoolOrigin: string | null) => void;
    password: string | null;
    setPassword: (newPassword: string | null) => void;
}

// Define the shape of the AuthProvider's props
interface AuthProviderProps {
    children: ReactNode;
}

// Create the AuthContext with the specified type
const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken_] = useState<string | null>(
        localStorage.getItem("TOKEN_PPDB")
    );
    const [username, setUsername_] = useState<string | null>(
        localStorage.getItem("USERNAME")
    );
    const [role, setRole_] = useState<string | null>(
        localStorage.getItem("ROLE")
    );
    const [user_id, setUserId_] = useState<string | null>(
        localStorage.getItem("USER_ID")
    );
    const [password, setPassword_] = useState<string | null>(
        localStorage.getItem("PASSWORD")
    );
    const [name, setName_] = useState<string | null>(
        localStorage.getItem("NAME")
    );
    const [position, setPosition_] = useState<string | null>(
        localStorage.getItem("POSITION")
    );
    const [tim, setTim_] = useState<string | null>(localStorage.getItem("TIM"));
    const [level, setLevel_] = useState<string | null>(
        localStorage.getItem("LEVEL")
    );
    const [imgUrl, setImgUrl_] = useState<string | null>(
        localStorage.getItem("IMG_URL")
    );
    const [schoolOrigin, setSchoolOrigin_] = useState<string | null>(
        localStorage.getItem("SCHOOL_ORIGIN")
    );

    // Function to set the authentication token
    const setToken = (newToken: string | null) => {
        setToken_(newToken);
    };
    const setPassword = (newPassword: string | null) => {
        setPassword_(newPassword);
    };
    const setUsername = (newUsername: string | null) => {
        setUsername_(newUsername);
    };
    const setTim = (newTim: string | null) => {
        setTim_(newTim);
    };
    const setLevel = (newLevel: string | null) => {
        setLevel_(newLevel);
    };
    const setUserId = (newUserId: string | null) => {
        setUserId_(newUserId);
    };
    const setName = (newName: string | null) => {
        setName_(newName);
    };
    const setRole = (newRole: string | null) => {
        setRole_(newRole);
    };
    const setImgUrl = (newImgUrl: string | null) => {
        setImgUrl_(newImgUrl);
    };
    const setPosition = (newPosition: string | null) => {
        setPosition_(newPosition);
    };
    const setSchoolOrigin = (newSchoolOrigin: string | null) => {
        setSchoolOrigin_(newSchoolOrigin);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = "Bearer " + token;
            localStorage.setItem("TOKEN_PPDB", token);
        } else {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("TOKEN_PPDB");
        }
    }, [token]);

    useEffect(() => {
        if (username) {
            localStorage.setItem("USERNAME", username);
        } else {
            localStorage.removeItem("USERNAME");
        }
    }, [username]);

    useEffect(() => {
        if (name) {
            localStorage.setItem("NAME", name);
        } else {
            localStorage.removeItem("NAME");
        }
    }, [name]);

    useEffect(() => {
        if (role) {
            localStorage.setItem("ROLE", role);
        } else {
            localStorage.removeItem("ROLE");
        }
    }, [role]);

    useEffect(() => {
        if (imgUrl) {
            localStorage.setItem("IMG_URL", imgUrl);
        } else {
            localStorage.removeItem("IMG_URL");
        }
    }, [imgUrl]);

    useEffect(() => {
        if (position) {
            localStorage.setItem("POSITION", position);
        } else {
            localStorage.removeItem("POSITION");
        }
    }, [position]);

    useEffect(() => {
        if (user_id) {
            localStorage.setItem("USER_ID", user_id);
        } else {
            localStorage.removeItem("USER_ID");
        }
    }, [user_id]);

    useEffect(() => {
        if (tim) {
            localStorage.setItem("TIM", tim);
        } else {
            localStorage.removeItem("TIM");
        }
    }, [tim]);

    useEffect(() => {
        if (level) {
            localStorage.setItem("LEVEL", level);
        } else {
            localStorage.removeItem("LEVEL");
        }
    }, [level]);

    useEffect(() => {
        if (schoolOrigin) {
            localStorage.setItem("SCHOOL_ORIGIN", schoolOrigin);
        } else {
            localStorage.removeItem("SCHOOL_ORIGIN");
        }
    }, [schoolOrigin]);

    useEffect(() => {
        if (password) {
            localStorage.setItem("PASSWORD", password);
        } else {
            localStorage.removeItem("PASSWORD");
        }
    }, [password]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
            username,
            setUsername,
            user_id,
            setUserId,
            name,
            setName,
            role,
            setRole,
            tim,
            setTim,
            level,
            setLevel,
            position,
            setPosition,
            imgUrl,
            setImgUrl,
            schoolOrigin,
            setSchoolOrigin,
            password,
            setPassword,
        }),
        [token, username, name, schoolOrigin, password, level, tim]
    );

    return (
        <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export default AuthProvider;
