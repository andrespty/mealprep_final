import React, { useEffect, useState, useRef, lazy, Suspense } from 'react'
import { Box } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { refresh_user_validation } from './Redux/middleware/user.thunks'

// import LogInSignUp from './pages/LogInSignUp'
// import MealPrep from './pages/MealPrep'
// import Header from './components/Header'
// import MenuContainer from './components/features/Menu/MenuContainer'

const LogInSignUp = lazy(() => import('./pages/LogInSignUp'))
const MealPrep = lazy(() => import('./pages/MealPrep'))
const Header = lazy(() => import('./components/Header'))
const MenuContainer = lazy(() => import('./components/features/Menu/MenuContainer'))

// export const fetch_url = 'http://localhost:5000'
export const fetch_url = 'http://mealprepapi.andrespty.com'

function App() {

    const dispatch = useDispatch()
    
    useEffect(() => {
        if (localStorage.getItem('token')){
            dispatch(refresh_user_validation())
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const [isSticky, setSticky] = useState(false);
    const ref = useRef(null);
    const handleScroll = () => {
      if (ref.current) {
        setSticky(ref.current.getBoundingClientRect().top <= 0);
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', () => handleScroll);
      };
    }, []);
  

  return (
    <Box>
        <BrowserRouter>
        
            <Box ref={ref} className={`sticky-wrapper${isSticky ? ' sticky' : ''}`} h='6rem'>
                <Header />
            </Box>

            <Suspense fallback=''>
              <Routes>

                  <Route path='login' element={<LogInSignUp isLogIn={true} />}/>
                  <Route path='signup' element={<LogInSignUp isLogIn={false} />}/>
                  <Route path='menu' element={<MenuContainer />} />
                  <Route path='/*' element={<MealPrep />} />

              </Routes>
            </Suspense>

        </BrowserRouter>
    </Box>
  )
}

export default App