set -e

for i in {0..49}; do
	docker run --rm -v $(pwd):/src 4b11528a97f2 test
done
