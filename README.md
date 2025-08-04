# News Channel Website with Contentstack TypeScript SDK

A modern news website built with Next.js 15 and Contentstack TypeScript SDK, featuring dynamic content management through various content types.

## 🚀 Features

### Content Types Integration
- **Global Setting**: Header configuration with logo, title, and live status
- **News Channel**: Main news content with various field types
- **Sidebar News**: Latest updates displayed in sidebar
- **Breaking Alert**: Real-time breaking news alerts
- **News Category**: Content categorization system
- **News Author**: Author information and profiles
- **Language Switch Button**: Multi-language support with dropdown and language options

### Technical Stack
- **Next.js 15**: Latest React framework with App Router
- **Contentstack TypeScript SDK**: Type-safe content management
- **Tailwind CSS**: Modern utility-first CSS framework
- **TypeScript**: Full type safety throughout the application

### Field Types Supported
- ✅ Text fields (title, description, URL)
- ✅ File fields (images, documents)
- ✅ Date fields (publishing dates)
- ✅ Number fields (priority, counts)
- ✅ Boolean fields (live status, flags)
- ✅ Link fields (external URLs)
- ✅ Reference fields (content relationships)
- ✅ Taxonomy fields (content categorization)
- ✅ Group fields (nested data structures)
- ✅ Rich text fields (formatted content)

## 📁 Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── Header.tsx          # Global Settings header
│   │   ├── Sidebar.tsx         # Sidebar News component
│   │   ├── BreakingAlert.tsx   # Breaking alerts component
│   │   └── SchemaFieldsDisplay.tsx
│   ├── layout.tsx
│   └── page.tsx                # Main page with all components
├── lib/
│   ├── contentstack.ts         # SDK configuration & TypeScript interfaces
│   └── contentstack-helpers.ts # Helper functions for data fetching
```

## 🔧 Content Types Schema

### Global Setting
- `title`: Logo/brand name
- `file`: Logo image
- `single_line`: Tagline/description
- `group.boolean`: Live status indicator

### News Channel
- `title`: News title
- `url`: External link
- `date`: Publication date
- `number`: Channel number
- `file`: Featured image
- `reference`: Related content
- `hgvgh767`: Boolean flag
- `b12jh7t7`: Boolean flag

### Sidebar News
- `title`: News title
- `file`: News image
- `descrption`: News description

### Breaking Alert
- `title`: Alert title
- `rich_text_editor`: Alert content
- `link`: Related link
- `boolean`: Verification status
- `reference`: Related news

### News Category
- `title`: Category name
- `url`: Category URL
- `rich_text_editor`: Category description
- `file`: Category image
- `taxonomies`: Category tags

### News Author
- `title`: Author name
- `rich_text_editor`: Author bio
- `file`: Author photo

### Language Switch Button
- `title`: Button display text
- `dropdown`: Array of available languages
- `choose_language`: Modular blocks with language options
  - `single_line`: Language name/text
  - `link`: Language-specific URL and title

## 🚀 Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   Create a `.env.local` file with:
   ```
   NEXT_PUBLIC_CONTENTSTACK_API_KEY=your_api_key
   NEXT_PUBLIC_CONTENTSTACK_DELIVERY_TOKEN=your_delivery_token
   NEXT_PUBLIC_CONTENTSTACK_ENVIRONMENT=your_environment
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🎨 Components

### Header Component
- Uses Global Setting content type
- Displays logo, title, and navigation
- Shows live status indicator
- Includes language switch button with dropdown
- Responsive design with mobile menu

### Sidebar Component
- Displays Sidebar News content
- Shows latest updates with images
- Includes quick stats
- Responsive layout

### Breaking Alert Component
- Real-time breaking news display
- Animated alerts with verification status
- Links to full articles
- Prominent visual styling

## 🔄 Data Flow

1. **Contentstack SDK**: Type-safe data fetching
2. **Helper Functions**: Centralized data access
3. **TypeScript Interfaces**: Full type safety
4. **React Components**: Dynamic content rendering
5. **Fallback Data**: Graceful error handling

## 📊 Performance Features

- **Static Generation**: Pre-rendered pages for fast loading
- **Image Optimization**: Next.js Image component support
- **TypeScript**: Compile-time error checking
- **Responsive Design**: Mobile-first approach
- **Error Boundaries**: Graceful error handling

## 🛠️ Development

### Adding New Content Types
1. Define TypeScript interface in `contentstack.ts`
2. Add helper function in `contentstack-helpers.ts`
3. Create React component in `app/components/`
4. Integrate into main page

### TypeScript Benefits
- Compile-time type checking
- IntelliSense support
- Refactoring safety
- Documentation through types

## 📝 License

This project is built with Next.js and Contentstack TypeScript SDK for modern content management.
