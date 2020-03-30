const welcomeRoute = router => {
  // Welcome route
  router.get('/api/v1', (_, res) =>
    res.json({ success: 'Welcome to DUV Live API V1. Live your Best Live' })
  );
};

export default welcomeRoute;
