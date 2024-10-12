## InterIIT Dev Team Selection Task

### Tech Used

- Frontend: ReactJS with Chakra-UI and Tanstack-Query
- Backend: NodeJS with ExpressJS and JWT Authentication
- Database: MongoDB
- Reverse Proxy: Caddy
- Containerization: Docker

### Set up the project

1. Clone the repository
2. Create `.env` files in directories with `sample.env` as template
3. Map `treeview.localhost` and `api.treeview.localhost` to 127.0.0.1 in `/etc/hosts` file in your system
4. Build:
   - Development: `docker compose -f docker-compose.dev.yaml up --build`
   - Production: `docker compose up --build`
5. Frontend will be available at `https://treeview.localhost` and backend at `https://api.treeview.localhost`

### Demonstration

[Google Drive Link](https://drive.google.com/file/d/1xecS3OcyOvB246mBU-iY4PofFhDvrSAk/view?usp=drive_link)
