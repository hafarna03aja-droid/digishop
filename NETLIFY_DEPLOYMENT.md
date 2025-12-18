# Netlify Deployment Guide

This guide will help you deploy the Herbal Shop application to Netlify.

## Prerequisites

1. **Netlify Account**: Create a free account at [netlify.com](https://netlify.com)
2. **Netlify CLI**: Install globally on your machine
3. **Environment Variables**: Have all your API keys and credentials ready

## Installation Steps

### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

### 2. Login to Netlify

```bash
netlify login
```

This will open a browser window to authenticate with your Netlify account.

### 3. Initialize Netlify Project

From your project directory:

```bash
netlify init
```

Follow the prompts to:
- Link to an existing Netlify site, or create a new one
- Configure your build settings (already configured in `netlify.toml`)

### 4. Configure Environment Variables

You have two options:

#### Option A: Via Netlify Dashboard
1. Go to your site in the Netlify dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add all variables from `.env.example`:

```
NEXT_PUBLIC_SUPABASE_URL=your_actual_value
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_value
SUPABASE_SERVICE_ROLE_KEY=your_actual_value
DATABASE_URL=your_actual_value
MIDTRANS_SERVER_KEY=your_actual_value
MIDTRANS_CLIENT_KEY=your_actual_value
MIDTRANS_IS_PRODUCTION=false
RESEND_API_KEY=your_actual_value
RAJAONGKIR_API_KEY=your_actual_value
TESTSPRITE_API_KEY=your_actual_value
```

#### Option B: Via CLI
```bash
netlify env:set VARIABLE_NAME "value"
```

### 5. Deploy to Netlify

#### Deploy to Preview (Draft)
```bash
npm run netlify:deploy
```

This creates a draft/preview deployment. Check the URL and test your site.

#### Deploy to Production
Once you've verified the preview works:
```bash
npm run netlify:deploy:prod
```

Or use:
```bash
netlify deploy --prod
```

## Build Configuration

The build configuration is defined in `netlify.toml`:

- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Node Version**: 20
- **Next.js Plugin**: Automatically handles Next.js routing and API routes

## Troubleshooting

### Build Fails

**Issue**: Build fails with "Module not found"
**Solution**: Ensure all dependencies are in `package.json`, not just `devDependencies`

**Issue**: Environment variables not working
**Solution**: Make sure all variables are prefixed with `NEXT_PUBLIC_` for client-side access

### Database Connection Issues

**Issue**: Can't connect to Supabase
**Solution**: 
1. Verify `DATABASE_URL` is correct
2. Check Supabase connection pooler settings
3. Ensure Supabase service is accessible from Netlify's servers

### API Routes Not Working

**Issue**: API routes return 404
**Solution**: 
1. Ensure `@netlify/plugin-nextjs` is configured in `netlify.toml`
2. Check the Netlify Functions tab for errors
3. Verify API routes are in `src/app/api/` directory

### Midtrans Payment Not Working

**Issue**: Payment gateway errors
**Solution**: 
1. Verify `MIDTRANS_SERVER_KEY` and `MIDTRANS_CLIENT_KEY` are set
2. Check `MIDTRANS_IS_PRODUCTION` setting (use `false` for testing)
3. Ensure Netlify URL is whitelisted in Midtrans dashboard

## Continuous Deployment

Netlify can automatically deploy when you push to GitHub:

1. In Netlify dashboard, go to **Site settings** → **Build & deploy**
2. Connect your GitHub repository
3. Configure branch deployments:
   - **Production branch**: `main` or `master`
   - **Deploy previews**: Enable for pull requests

Now every push to your main branch will trigger a deployment!

## Custom Domain

To use a custom domain:

1. Go to **Domain settings** in Netlify dashboard
2. Click **Add custom domain**
3. Follow instructions to configure DNS records
4. Netlify will automatically provision SSL certificate

## Monitoring

- **Build logs**: Check in Netlify dashboard under **Deploys**
- **Function logs**: View in **Functions** tab
- **Analytics**: Enable Netlify Analytics for visitor insights

## Support

- [Netlify Documentation](https://docs.netlify.com/)
- [Next.js on Netlify](https://docs.netlify.com/integrations/frameworks/next-js/)
- [Netlify Community](https://answers.netlify.com/)
