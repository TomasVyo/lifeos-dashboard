@echo off
title LifeOS Personal Dashboard
echo Spoustim LifeOS Personal Dashboard...
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1"
pause
