@echo Setting environment for using mingw x64 tools.

@set MINGWINSTALLDIR=C:\tools\mingw64\bin

@if exist %MINGWINSTALLDIR% set PATH=%MINGWINSTALLDIR%;%PATH%

@rem PATH
@rem -------
@set PATH=%MINGWINSTALLDIR%\bin;%PATH%
@set PATH=%MINGWINSTALLDIR%\x86_64-w64-mingw32\bin;%PATH%

@rem INCLUDE
@rem -------
@set INCLUDE=%MINGWINSTALLDIR%\include;%INCLUDE%
@set INCLUDE=%MINGWINSTALLDIR%\x86_64-w64-mingw32\include;%INCLUDE%

@rem LIB
@rem -------
@set LIB=%MINGWINSTALLDIR%\lib;%LIB%
@set LIB=%MINGWINSTALLDIR%\x86_64-w64-mingw32\lib;%LIB%


@call cmd /C "make"
