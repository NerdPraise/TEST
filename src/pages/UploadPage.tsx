import React, { useState, useRef } from 'react'
import { Upload, AlertCircle, Check, X, Loader2 } from 'lucide-react'

interface ClassificationResult {
  prediction: string
  confidence: number
  error?: string
}

const UploadPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [result, setResult] = useState<ClassificationResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length) {
      handleFile(files[0])
    }
  }

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    setResult(null)
    setError(null)

    if (!file.type.match('image.*')) {
      setError('Please select an image file (JPEG, PNG, etc.)')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit. Please select a smaller image.')
      return
    }

    setSelectedImage(file)

    const reader = new FileReader()
    reader.onload = (e) => {
      setImagePreview((e.target?.result as string) || null)
    }
    reader.readAsDataURL(file)
  }

  const handleClassify = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append('file', selectedImage)

      const response = await fetch('https://classifierbe.fly.dev/predict', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error(
          `Server responded with ${response.status}: ${response.statusText}`
        )
      }

      const data = await response.json()
      console.log('Response data:', data)
      setResult({
        prediction: data.prediction || 'Unknown',
        confidence: data.confidence || 0,
      })
    } catch (err) {
      console.error('Error classifying image:', err)
      setError('Error processing image. Please try again later.')
    } finally {
      setIsLoading(false)
    }
  }

  const resetAll = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-4xl mx-auto mt-20">
      <h1 className="text-3xl md:text-4xl font-bold font-exo text-center mb-8">
        <span className="bg-gradient-to-r from-blue-400 to-violet-400 text-transparent bg-clip-text">
          Image Authenticity Detector
        </span>
      </h1>

      <div className="glass-card p-8">
        {!imagePreview ? (
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center ${
              isDragging
                ? 'border-accent-blue bg-accent-blue/10'
                : 'border-slate-600 hover:border-slate-400'
            } transition-all duration-200`}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <Upload className="h-12 w-12 mx-auto mb-4 text-slate-400" />
            <h3 className="text-xl font-semibold mb-2">
              Drag & Drop Image Here
            </h3>
            <p className="text-slate-400 mb-6">or click to browse files</p>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileInput}
              ref={fileInputRef}
            />
            <button
              className="btn-secondary"
              onClick={() => fileInputRef.current?.click()}
            >
              Select Image
            </button>

            {error && (
              <div className="mt-4 text-error flex items-center justify-center">
                <AlertCircle className="h-5 w-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Image Preview */}
              <div className="md:w-1/2">
                <div className="relative rounded-lg overflow-hidden bg-slate-800 aspect-square flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full max-h-full object-contain"
                  />
                  <button
                    onClick={resetAll}
                    className="absolute top-2 right-2 bg-slate-900/70 p-1 rounded-full hover:bg-slate-800 transition-colors"
                    aria-label="Remove image"
                  >
                    <X className="h-5 w-5 text-slate-300" />
                  </button>
                </div>
                <p className="text-center text-slate-400 text-sm mt-2">
                  {selectedImage?.name} (
                  {(selectedImage?.size / 1024).toFixed(1)} KB)
                </p>
              </div>

              {/* Results or Analysis Button */}
              <div className="md:w-1/2 flex flex-col">
                {!result ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <h3 className="text-xl font-semibold mb-4">
                      Ready to Analyze
                    </h3>
                    <p className="text-slate-400 text-center mb-8">
                      Click the button below to check if this image is real or
                      AI-generated.
                    </p>
                    <button
                      className="btn-primary w-full flex flex-row"
                      onClick={handleClassify}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                          <span>Analyzing...</span>
                        </>
                      ) : (
                        'Analyze Image'
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="glass-card-dark p-6 h-full flex flex-col">
                    <h3 className="text-xl font-semibold mb-6 text-center">
                      Analysis Result
                    </h3>

                    <div className="flex-1 flex flex-col items-center justify-center">
                      <div
                        className={`p-4 rounded-full ${
                          result.prediction.toLowerCase() === 'real'
                            ? 'bg-success/20 text-success'
                            : 'bg-error/20 text-error'
                        } mb-6`}
                      >
                        {result.prediction.toLowerCase() === 'real' ? (
                          <Check className="h-12 w-12" />
                        ) : (
                          <AlertCircle className="h-12 w-12" />
                        )}
                      </div>

                      <div className="text-center mb-6">
                        <h4 className="text-2xl font-bold mb-2">
                          {result.prediction.toUpperCase()}
                        </h4>
                        <p className="text-slate-400">
                          Confidence: {(result.confidence * 100).toFixed(2)}%
                        </p>
                      </div>

                      <div className="w-full bg-slate-700 rounded-full h-2.5 mb-6">
                        <div
                          className={`h-2.5 rounded-full ${
                            result.prediction.toLowerCase() === 'real'
                              ? 'bg-success'
                              : 'bg-error'
                          }`}
                          style={{ width: `${result.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>

                    <button className="btn-secondary mt-4" onClick={resetAll}>
                      Analyze Another Image
                    </button>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-lg text-error flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-12 text-center">
        <h3 className="text-xl font-semibold mb-4">How It Works</h3>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Our AI model analyzes patterns, artifacts, and inconsistencies in
          images that are typically invisible to the human eye but indicate
          whether an image is authentic or AI-generated. The system provides a
          confidence score to help you determine the likelihood of image
          manipulation.
        </p>
      </div>
    </div>
  )
}

export default UploadPage
