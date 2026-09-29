# CORS Configuration for Headless WordPress

> Add this code to your WordPress theme's `functions.php` file to allow the Astro frontend to fetch data via GraphQL.

---

## CORS Code

```php
<?php
/**
 * CORS Configuration for Headless Astro Frontend
 * 
 * Add this to your theme's functions.php file.
 * Allows the Astro frontend to fetch data from WordPress GraphQL.
 */

// CORS headers for GraphQL requests
add_action('init', function() {
  // Allowed origins - add your frontend URLs here
  $allowed_origins = [
    'http://localhost:4321',    // Astro dev server
    'http://localhost:3000',    // Alternative dev port
    'https://thedigitalecho.com', // Production URL
  ];
  
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
  
  if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    header('Access-Control-Allow-Credentials: true');
  }
});

// Handle preflight OPTIONS requests
add_action('admin_init', function() {
  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    status_header(200);
    exit();
  }
});

// Also handle CORS for GraphQL endpoint specifically
add_action('wp_graphql_init', function() {
  $allowed_origins = [
    'http://localhost:4321',
    'http://localhost:3000',
    'https://thedigitalecho.com',
  ];
  
  $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
  
  if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: {$origin}");
    header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
  }
});
```

---

## How to Add This Code

1. Log in to WordPress Admin
2. Go to **Appearance > Theme File Editor**
3. Select your active theme
4. Open `functions.php`
5. Add the code above at the end of the file (before the closing `?>` if it exists)
6. Click **Update File**

---

## How to Test CORS

### 1. Open Browser Developer Console

Go to your Astro frontend (http://localhost:4321) and open DevTools (F12).

### 2. Run a Test Query

In the Console tab, run:

```javascript
fetch('http://the-digital-echo.local/graphql', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: `{ generalSettings { title description } }`
  })
})
.then(r => r.json())
.then(data => console.log(data));
```

### 3. Expected Result

You should see:
```json
{
  "data": {
    "generalSettings": {
      "title": "The Digital Echo",
      "description": "Digital Marketing & Content Production"
    }
  }
}
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `Access-Control-Allow-Origin` error | Check that your frontend URL is in `$allowed_origins` |
| CORS works in browser but not in build | Ensure `http://localhost:4321` is in the allowed list |
| GraphQL returns null | Check field names match the schema |
| Still getting CORS errors | Clear browser cache, try incognito mode |

---

## Adding More Frontend URLs

To add more allowed origins, add them to the `$allowed_origins` array:

```php
$allowed_origins = [
  'http://localhost:4321',
  'http://localhost:3000',
  'https://thedigitalecho.com',
  'https://www.thedigitalecho.com',
  'https://staging.thedigitalecho.com',
];
```

---

## Production Notes

- For production, remove `localhost` URLs from the allowed list
- Consider using environment variables for allowed origins
- The `wp_graphql_init` hook ensures CORS works specifically for GraphQL requests
