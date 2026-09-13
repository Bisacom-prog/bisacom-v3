FREE PLANNER PAGE UPDATE

This update adds one page to your existing Next.js portfolio. It reuses
components/EbookWaitlist.tsx and your existing signup API and email delivery.

1. Extract this ZIP.
2. Copy the included app/free-planner folder into your CURRENT portfolio's app folder.
   The resulting file should be C:\Dev\Bisacom_portfolio\app\free-planner\page.tsx.
   Keep your existing app/page.tsx and all other portfolio files.
3. In Git Bash, from your current portfolio folder, run:

   npm run build

4. If the build succeeds, deploy using your existing GitHub/Vercel workflow:

   git add app/free-planner/page.tsx
   git commit -m "Add dedicated free planner signup page"
   git push origin main

5. Wait for Vercel's production deployment to show Ready.
6. Open https://bisacom.dev/free-planner and check the signup form.
7. Change your Instagram bio URL to https://bisacom.dev/free-planner
   Title: Free 30-Day Career Planner

This URL shows the signup page directly. It does not redirect to a #book
anchor or bypass the email signup by linking straight to the PDF.
The new address will not work on your live website until you deploy it.
