set -e

function cleanup {
  docker-compose down -v
}

trap cleanup EXIT # Run `cleanup` if the script exits unexpectedly

cleanup
docker-compose up -d website
npx wait-on http://localhost:8000
docker-compose run visual-regression-tests test
