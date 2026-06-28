@echo off
echo Setting up remotes...

call :add github https://github.com/soundcloak-api/api.git
call :add hf https://huggingface.co/spaces/1c34/soundcloak

echo Pushing...
for %%R in (github hf) do git push %%R main --force

echo Done!
exit /b

:add
git remote remove %1 2>nul
git remote add %1 %2
exit /b