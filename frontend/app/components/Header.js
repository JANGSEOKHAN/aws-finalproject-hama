'use client';
import Link from 'next/link';
import Image from 'next/image';
import { GoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginButton from './LoginButton';

export default function Header({ onLogin }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokenCheckInterval, setTokenCheckInterval] = useState(null);
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  // 토큰 상태 체크 함수
  const checkTokenStatus = () => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const currentTime = new Date();
    const tokenLastPart = token ? `...${token.slice(-10)}` : '없음';
    const refreshLastPart = refreshToken
      ? `...${refreshToken.slice(-10)}`
      : '없음';

    // console.log(
    //   `\n=== 토큰 상태 체크 [${currentTime.toLocaleTimeString()}] ===`
    // );
    // console.log('현재 Access Token (마지막 10자):', tokenLastPart);
    // console.log('현재 Refresh Token (마지막 10자):', refreshLastPart);
    // console.log('----------------------------------------');
  };

  // 토큰 갱신 함수
  const refreshAccessToken = async () => {
    try {
      const oldToken = localStorage.getItem('access_token');
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        console.error('Refresh token not found');
        handleLogout();
        return;
      }

      const response = await fetch('/api/auth/refresh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        }),
      });

      if (response.ok) {
        const data = await response.json();

        if (data.success && data.meta.tokens.accessToken) {
          const newToken = data.meta.tokens.accessToken;
          localStorage.setItem('access_token', newToken);

          // 새로운 refresh token이 있다면 업데이트
          if (data.meta.tokens.refreshToken) {
            localStorage.setItem(
              'refresh_token',
              data.meta.tokens.refreshToken
            );
          }

          console.log('토큰 갱신 성공:', {
            oldToken: oldToken?.slice(-10),
            newToken: newToken?.slice(-10),
          });

          // 다음 갱신 타이머 설정 (1시간)
          setTimeout(refreshAccessToken, 60 * 60 * 1000);
        } else {
          console.error('Invalid token refresh response:', data);
          handleLogout();
        }
      } else {
        console.error('Token refresh failed:', response.status);
        handleLogout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      handleLogout();
    }
  };

  // 토큰 갱신 타이머 설정 함수
  const setTokenRefreshTimer = () => {
    const THIRTY_SECONDS = 60 * 60 * 1000; // 30초로 변경
    const nextRefreshTime = new Date(Date.now() + THIRTY_SECONDS);

    console.log('\n=== 토큰 갱신 타이머 설정 ===');
    console.log('현재 시간:', new Date().toLocaleTimeString());
    console.log('다음 갱신 예정 시간:', nextRefreshTime.toLocaleTimeString());
    console.log('남은 시간: 30초');

    setTimeout(refreshAccessToken, THIRTY_SECONDS);
  };

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const userStr = localStorage.getItem('user');

    console.log('Initial auth check:', {
      hasAccessToken: !!token,
      hasRefreshToken: !!refreshToken,
      hasUserData: !!userStr,
    });

    if (token && refreshToken) {
      try {
        const userData = userStr ? JSON.parse(userStr) : null;
        setIsLoggedIn(true);

        // 토큰 갱신 타이머 설정 (1시간)
        const refreshTimer = setTimeout(refreshAccessToken, 60 * 60 * 1000);

        return () => {
          clearTimeout(refreshTimer);
          if (tokenCheckInterval) {
            clearInterval(tokenCheckInterval);
          }
        };
      } catch (error) {
        console.error('Error parsing user data:', error);
        handleLogout();
      }
    }
  }, []);

  const handleLogout = () => {
    console.log('=== 로그아웃 시작 ===');
    console.log('제거할 인증 정보 상태:', {
      hasAccessToken: Boolean(localStorage.getItem('access_token')),
      hasRefreshToken: Boolean(localStorage.getItem('refresh_token')),
      hasUserData: Boolean(localStorage.getItem('user')),
    });

    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');

    // 토큰 체크 인터벌 정리
    if (tokenCheckInterval) {
      clearInterval(tokenCheckInterval);
    }

    console.log('=== 로그아웃 완료 ===');
    console.log('인증 정보 제거 후 상태:', {
      hasAccessToken: Boolean(localStorage.getItem('access_token')),
      hasRefreshToken: Boolean(localStorage.getItem('refresh_token')),
      hasUserData: Boolean(localStorage.getItem('user')),
    });

    // 메인 페이지로 리다이렉트
    window.location.href = '/';
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <header className="bg-white flex flex-col items-center">
      <div className="w-full flex justify-center items-center px-6 gap-x-24">
        <Link href="/" className="mr-8">
          <Image src="/hama_logo.jpg" alt="HAMA Logo" width={150} height={50} />
        </Link>
        <div className="flex justify-center">
          <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-4">
            <div className="flex items-center gap-0">
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder="어떤 상품을 찾으시나요?"
                className="flex-1 px-4 py-2 rounded-full border-2 border-orange-300 focus:border-orange-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-500 transition-colors duration-200 whitespace-nowrap"
              >
                검색
              </button>
            </div>
          </form>
        </div>

        <div className="flex items-center gap-4">
          {!isLoggedIn && <LoginButton onLogin={onLogin} />}
          {isLoggedIn && (
            <nav className="flex items-center space-x-0">
              {/* 장바구니 버튼 */}
              <Link
                href="/shoppingcart"
                className="flex flex-col items-center  px-2 py-2 text-black rounded-lg hover:bg-blue-200 transition-colors"
              >
                <span className="text-2xl">🛒</span>
                <span className="text-sm font-semibold">장바구니</span>
              </Link>

              {/* 마이페이지 버튼 */}
              <Link
                href="/mypage"
                className="flex flex-col items-center px-2 py-2 text-black rounded-lg hover:bg-orange-200 transition-colors"
              >
                <span className="text-2xl">👤</span>
                <span className="text-sm font-semibold">마이페이지</span>
              </Link>

              {/* 로그아웃 버튼 */}
              <button
                onClick={handleLogout}
                className="flex flex-col items-center px-2 py-2 text-gray-700 rounded-lg font-semibold bg-white hover:bg-pink-200 transition-colors"
              >
                <span className="text-2xl">🚪</span>
                <span className="text-sm font-semibold">로그아웃</span>
              </button>
            </nav>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <nav className="w-full flex justify-center space-x-10 text-lg font-medium mt-10 border-b pb-2">
          <Link
            href="/"
            className="hover:text-orange-600 hover:underline text-black transition-colors"
          >
            Home
          </Link>
          <Link
            href="/budget"
            className="hover:text-orange-600 hover:underline text-black transition-colors"
          >
            예산관리
          </Link>
          <Link
            href="/statistics"
            className="hover:text-orange-600 hover:underline text-black  transition-colors"
          >
            지출통계
          </Link>
          <Link
            href="/calendar"
            className="hover:text-orange-600 hover:underline text-black transition-colors"
          >
            지출달력
          </Link>
          <Link
            href="/community"
            className="hover:text-orange-600 hover:underline text-black transition-colors"
          >
            커뮤니티
          </Link>
        </nav>
      )}
    </header>
  );
}
