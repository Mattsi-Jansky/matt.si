set -e

for i in {0..49}; do
  docker-compose run visual-regression-tests test
done
