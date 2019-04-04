import englishMessages from 'ra-language-english';

export default {
    ...englishMessages,
    Not_Found: 'Not Found',
    pos: {
        search: 'Search',
        configuration: 'Configuration',
        language: 'Language',
        theme: {
            name: 'Theme',
            light: 'Light',
            dark: 'Dark',
        },
        dashboard: {
            registered_happs: 'Registered hApps',
            monthly_revenue: 'Monthly Revenue',
            host_clients: 'Currently Hosted',
            pending_reviews: 'Pending Reviews',
            order: {
                items:
                    'by %{user_name}, one item |||| by %{user_name}, %{nb_items} items',
            },
            welcome: {
                title: 'Welcome ',
                subtitle:
                    "This is the admin of an Holo Hosting App, the place where Hosts and Providers can connect to share and distribute use of hApps."
            },
            registerProvider: {
              not_provider_title:"You are not yet registered as a hApp Provider",
              is_provider_title:"Provider Snapshot"
            },
            registerHost: {
              not_host_title: 'You are yet registered as a Host',
              is_host_title:"Provider Snapshot"
            },
            NotRegistered: {
              host: 'To view and amange all enabled hApps for Hosting, please first register as a Host.',
              provider: "To activate and manage hApps you've enabled hApps for Hosting, please first register as a Provider."
            }
        },
        menu: {
            sales: 'Dashboard',
            catalog: 'hApp Catalog',
            users: 'Users',
            reviews: 'Reviews'
        },
    },
    resources: {
        users: {
            name: 'Users |||| Users',
            fields: {
                name: 'Name',
                last_seen_gte: 'Visited Since',
            },
            tabs: {
                identity: 'Identity',
                address: 'Address',
                reviews: 'Reviews',
                stats: 'Stats',
            },
            page: {
              delete: 'Delete User',
            },
            list: {
                search: 'Search',
            },
            form: {
                summary: 'Summary',
            },
            edit: {
                title: 'User "%{title}"',
            },
            action: {
                save_and_add: 'Save and Add',
                save_and_show: 'Save and Show',
            },
        },
        happs: {
            name: 'hApps |||| hApps',
            fields: {
                category_id: 'Category',
                height_gte: 'Min height',
                height_lte: 'Max height',
                height: 'Height',
                image: 'Image',
                price: 'Price',
                reference: 'Reference',
                stock_lte: 'Low Stock',
                stock: 'Stock',
                thumbnail: 'Thumbnail',
                width_gte: 'Min width',
                width_lte: 'Max width',
                width: 'Width',
            },
            tabs: {
                image: 'Image',
                details: 'Details',
                description: 'Description',
                reviews: 'Reviews',
            },
        },
        categories: {
            name: 'Category |||| Categories',
            fields: {
                happs: 'hApps',
            },
        },
        register: {
          host: 'Register',
          provider:'Register'
        },
        reviews: {
            name: 'Review |||| Reviews',
            detail: 'Review detail',
            fields: {
                user_id: 'User',
                command_id: 'Order',
                happ_id: 'hApp',
                date_gte: 'Posted since',
                date_lte: 'Posted before',
                date: 'Date',
                comment: 'Comment',
                rating: 'Rating',
            },
            action: {
                accept: 'Accept',
                reject: 'Reject',
            },
            notification: {
                approved_success: 'Review approved',
                approved_error: 'Error: Review not approved',
                rejected_success: 'Review rejected',
                rejected_error: 'Error: Review not rejected',
            },
        },
        posts: {
          name: 'Post |||| Posts',
          fields: {
               average_note: 'Average note',
               body: 'Body',
               comments: 'Comments',
               commentable: 'Commentable',
               commentable_short: 'Com.',
               created_at: 'Created at',
               notifications: 'Notifications recipients',
               nb_view: 'Nb views',
               password: 'Password (if protected post)',
               pictures: 'Related Pictures',
               published_at: 'Published at',
               teaser: 'Teaser',
               tags: 'Tags',
               title: 'Title',
               views: 'Views',
               authors: 'Authors',
            },
            list: {
                search: 'Search',
            },
            form: {
                summary: 'Summary',
                body: 'Body',
                miscellaneous: 'Miscellaneous',
                comments: 'Comments',
            },
            edit: {
                title: 'Post "%{title}"',
            },
            action: {
              save_and_edit: 'Save and Edit',
              save_and_add: 'Save and Add',
              save_and_show: 'Save and Show',
              save_with_average_note: 'Save with Note',
            }
        },
    },
};
